import { createContext, useContext, useState } from "react";

const DrawerContext = createContext<{
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
} | null>(null);

export function DrawerProvider({ children }: { children: React.ReactNode }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <DrawerContext.Provider value={{ isDrawerOpen, setIsDrawerOpen }}>
      {children}
    </DrawerContext.Provider>
  );
}

export function useDrawerContext() {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error("useDrawerContext must be used inside a <DrawerProvider>");
  }
  return context;
}
