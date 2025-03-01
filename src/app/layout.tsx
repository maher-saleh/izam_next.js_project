"use client";

import "./globals.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { createContext, useContext, useState } from "react";
import { DrawerProvider } from "./contexts/drawer";
import { ProfileProvider } from "./contexts/profile";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <DrawerProvider>
      <ProfileProvider>
        <html lang="en">
          <body className="min-h-screen bg-gray-100">
            <div className="flex h-screen">
              <DndProvider backend={HTML5Backend}><Sidebar /></DndProvider>
              <Navbar />
              <div className="ml-0 lg:ml-[400px] w-full p-6 pt-24 transition-margin duration-300">
                {children}
              </div>
            </div>
            <Footer />
          </body>
        </html>
      </ProfileProvider>
    </DrawerProvider>
  );
}