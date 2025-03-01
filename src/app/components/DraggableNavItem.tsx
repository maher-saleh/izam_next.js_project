"use client";
import { useEffect, useRef, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { MenuItem } from "./Sidebar";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EditIcon from "@mui/icons-material/Edit";
import EditOffIcon from "@mui/icons-material/EditOff";
import Tooltip from "@mui/material/Tooltip";
import { useRouter } from "next/navigation";
import { useDrawerContext } from "../contexts/drawer";

type DraggableNavItemProps = {
  id: number;
  title: string;
  visible: boolean;
  editMode: boolean;
  index: number;
  parentId: number | null;
  target: string;
  moveItem: (dragId: number, hoverId: number, parentId: number | null) => void;
  childrenItems?: MenuItem[];
  onTitleChange: (id: number, newTitle: string) => void;
  onVisibilityChange: (id: number, visible: boolean) => void;
};

const DraggableNavItem: React.FC<DraggableNavItemProps> = ({
  id, title, visible, editMode, parentId, target, moveItem, childrenItems, onTitleChange, onVisibilityChange
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const hasChildren = childrenItems && childrenItems.length > 0;

  const [{ }, drag] = useDrag({
    type: parentId === null ? "PARENT" : "CHILD",
    item: { id, parentId },
    canDrag: editMode,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const { setIsDrawerOpen } = useDrawerContext();

  const [, drop] = useDrop({
    accept: parentId === null ? "PARENT" : "CHILD",
    hover: (draggedItem: { id: number; parentId: number | null }) => {
      if (draggedItem.id !== id) {
        moveItem(draggedItem.id, id, parentId);
        draggedItem.parentId = parentId;
      }
    },
    drop: (draggedItem: { id: number; parentId: number | null }) => {
      moveItem(draggedItem.id, id, parentId);
    },
  });


  drag(drop(ref));

  const [isVisible, setIsVisible] = useState(visible);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [titleValue, setTitleValue] = useState(title);
  const handleInputKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setIsEditingTitle(!isEditingTitle);
    }
  }

  useEffect(() => {
    onEditModeChange();
  }, [editMode]);

  useEffect(() => {
    setIsVisible(visible);
  }, [visible]);

  useEffect(() => {
    setTitleValue(title);
  }, [title]);

  const onEditModeChange = () => {
    setIsEditingTitle(false);
  }

  const router = useRouter();
  const handleNavigation = (e: React.MouseEvent, target: string) => {
    e.stopPropagation();
    if(target){
      router.push(target);
      setIsDrawerOpen(false);
    }
  };

  return (
    <div ref={ref} className={`w-full ${editMode || isVisible ? "block" : "hidden"}`}>
      <Accordion className={`text-black rounded shadow-none ${parentId?null:"bg-gray-100"}`}>
        <AccordionSummary component="div" className="min-h-0 [&.Mui-expanded]:min-h-0 [&_.MuiAccordionSummary-content.Mui-expanded]:my-3 hover:bg-green-100"
          expandIcon={hasChildren ? <ExpandMoreIcon className="text-gray-500" /> : null}
        >
          <div className="flex items-center gap-2 w-full" onClick={(e)=>handleNavigation(e, target)}>
            {editMode && 
              <Tooltip title={<span className="text-base">Drag to reorder</span>}>
                <DragIndicatorIcon className={`${isVisible? "text-gray-600":"text-gray-400"}`}/>
              </Tooltip>
            }
            {isEditingTitle?
              <input className="outline outline-1 outline-gray-500 rounded px-1" value={titleValue} onChange={(e)=> {
                setTitleValue(e.target.value);
                onTitleChange(id, e.target.value);
              }} onKeyUp={handleInputKeyUp}
              />
              :<Typography className={`${isVisible? "text-gray-700":"text-gray-400"}`} onClick={(e)=>handleNavigation(e, target)}>{titleValue}</Typography>
            }
            {
              editMode && (
                <div className="ml-auto">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsEditingTitle(!isEditingTitle);
                    }}
                    className="text-black text-thin"
                  >
                    <Tooltip title={<span className="text-base">Edit Mode</span>}>
                      {isEditingTitle ? (
                        <EditOffIcon className="text-gray-500"/>
                      ) : (
                        <EditIcon className="text-gray-500"/>
                      )}
                    </Tooltip>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      const newVisibility = !isVisible;
                      onVisibilityChange(id, newVisibility);
                      setIsVisible(newVisibility);
                    }}
                    className="text-black text-thin"
                  >
                    <Tooltip title={<span className="text-base">Visibility</span>}>
                      {isVisible ? (
                        <VisibilityIcon className="text-gray-500 mr-1"/>
                      ) : (
                        <VisibilityOffIcon className="text-gray-500 mr-1"/>
                      )}
                    </Tooltip>
                  </button>
                </div>
              )
            }
          </div>
        </AccordionSummary>

        {hasChildren && (
          <AccordionDetails className="space-y-2 bg-white">
            {childrenItems.map((child) => (
              <DraggableNavItem
                key={child.id}
                id={child.id}
                title={child.title}
                visible={child.visible ?? true}
                editMode={editMode}
                index={child.index}
                parentId={id}
                target={child.target}
                moveItem={moveItem}
                childrenItems={child.children}
                onTitleChange={(_, newTitle) => onTitleChange(child.id, newTitle)}
                onVisibilityChange={(_, isVisible) => onVisibilityChange(child.id, isVisible)}
              />
            ))}
          </AccordionDetails>
        )}
      </Accordion>
    </div>
  );
};

export default DraggableNavItem;
