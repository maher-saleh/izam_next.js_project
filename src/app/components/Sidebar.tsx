"use client";
import { useEffect, useState, useCallback } from "react";
import DraggableNavItem from "./DraggableNavItem";
import SettingsIcon from "@mui/icons-material/Settings";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Tooltip } from "@mui/material";
import { useDrawerContext } from "../contexts/drawer";

export type MenuItem = {
  id: number;
  title: string;
  target: string;
  index: number;
  visible?: boolean;
  parentId?: number | null;
  children?: MenuItem[];
};

const Sidebar = () => {

  const { isDrawerOpen } = useDrawerContext();
  const [originalMenuItems, setOriginalMenuItems] = useState<MenuItem[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        // const response = await fetch("https://expressbackend-production-958b.up.railway.app/nav");
        const response = await fetch("https://nodejs-serverless-function-express-gamma-eosin.vercel.app/api/nav");
        if (!response.ok) throw new Error("Failed to fetch menu items");
        const data = await response.json();
        setMenuItems([...data]);
        setOriginalMenuItems([...data]);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };
    fetchMenuItems();
  }, []);
  
  const handleCancelClick = () => {
    setMenuItems([...originalMenuItems]);
  }

  const saveData = async () => {
    setOriginalMenuItems([...menuItems]);

    try {
      // const response = await fetch("https://expressbackend-production-958b.up.railway.app/nav", {
      const response = await fetch("https://nodejs-serverless-function-express-gamma-eosin.vercel.app/api/nav", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(menuItems),
      });
      if (!response.ok) throw new Error("Failed to fetch menu items");
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  };

  const moveItem = useCallback(
    (dragId: number, hoverId: number, parentId: number | null) => {
      setMenuItems((prevItems) => {
        const deepClone = (items: MenuItem[]): MenuItem[] => 
          items.map(item => ({ ...item, children: item.children ? deepClone(item.children) : [] }));

        const clonedItems = deepClone(prevItems);

        const findItem = (items: MenuItem[], id: number): [MenuItem[], number] | null => {
          for (let i = 0; i < items.length; i++) {
            if (items[i].id === id) return [items, i];
            const found = findItem(items[i].children ?? [], id);
            if (found) return found;
          }
          return null;
        };

        const source = findItem(clonedItems, dragId);
        const target = findItem(clonedItems, hoverId);

        if (!source || !target) return prevItems;

        const [sourceParent, sourcePos] = source;
        const [targetParent, targetPos] = target;

        if (parentId !== null && sourceParent !== targetParent) return prevItems;

        const [movedItem] = sourceParent.splice(sourcePos, 1);
        targetParent.splice(targetPos, 0, movedItem);

        
        try {
          fetch("https://nodejs-serverless-function-express-gamma-eosin.vercel.app/api/track", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: dragId, from: dragId, to: hoverId }),
          });
        } catch (error) {
          console.error("Error fetching menu:", error);
        }

        return clonedItems;
      });
    },
    [setMenuItems]
  );

  const updateTitle = (id: number, newTitle: string) => {
    setMenuItems((prevItems) =>
      prevItems.map((item) =>
        updateItemRecursively(item, id, { title: newTitle })
      )
    );
  };

  const updateVisibility = (id: number, visibility: boolean) => {
    setMenuItems((prevItems) =>
      prevItems.map((item) =>
        updateItemRecursively(item, id, { visible: visibility })
      )
    );
  };

  const updateItemRecursively = (item: MenuItem, id: number, newData: Partial<MenuItem>): MenuItem => {
    if (item.id === id) {
      return { ...item, ...newData };
    }
    if (item.children) {
      return {
        ...item,
        children: item.children.map((child) => updateItemRecursively(child, id, newData)),
      };
    }
    return item;
  };

  return (
    <>
        <aside className={`z-30 fixed left-0 top-16 w-[400px] h-[calc(100vh-10px)] bg-white text-white transition-transform duration-300 ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"}
                          lg:translate-x-0 md:block max-w-[100%]`}>
          <div className="flex justify-between items-center mb-2 border-b-2 border-gray-100 px-4 pt-6 pb-4">
            <h2 className="text-xl font-bold text-gray-700">Menu</h2>
            <button
              onClick={() => {
                setEditMode(!editMode);
              }}
              className="text-gray-700 text-thin"
            >
              {
                <div className="text-3xl text-gray-600">{
                  editMode?
                    <>
                      <Tooltip title={<span className="text-base">Cancel</span>}>
                        <HighlightOffIcon className="text-4xl text-red-500" onClick={handleCancelClick}/>
                      </Tooltip>
                      <Tooltip title={<span className="text-base">Apply</span>}>
                        <CheckCircleOutlineIcon className="text-4xl text-green-600" onClick={saveData}/>
                      </Tooltip>
                    </>
                  :
                    <Tooltip title={<span className="text-base">Menu Settings</span>}>
                      <SettingsIcon className="text-4xl text-gray-400"/>
                    </Tooltip>
                  }
                </div>
              }
            </button>
          </div>

          <ul key={menuItems.length} className="space-y-2 p-4">
            {
              menuItems.map((item) => {
                return <DraggableNavItem 
                key={item.id}
                id={item.id}
                title={item.title}
                visible={item.visible ?? true}
                editMode={editMode}
                index={item.index}
                parentId={null}
                target={item.target}
                moveItem={(dragIndex, hoverIndex) => moveItem(dragIndex, hoverIndex, null)}
                childrenItems={item.children}
                onTitleChange={updateTitle}
                onVisibilityChange={updateVisibility}
                />
              })
            }
          </ul>
        </aside>
    </>
  );
};

export default Sidebar;
