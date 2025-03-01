import { createContext, useContext, useState } from "react";

const ProfileContext = createContext<{
  isProfileOpen: boolean;
  setIsProfileOpen: (open: boolean) => void;
} | null>(null);

export function ProfileProvider({ children }: { children: React.ReactNode }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <ProfileContext.Provider value={{ isProfileOpen, setIsProfileOpen }}>
      {children}
    </ProfileContext.Provider>
  );
}

export function useProfileContext() {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfileContext must be used inside a <ProfileProvider>");
  }
  return context;
}
