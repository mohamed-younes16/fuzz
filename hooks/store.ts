"use client";
import getCurrentUser from "@/actions";
import { useEffect } from "react";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Store = {
  SideBarOpen: boolean;
  setSideBarOpen: (v: boolean) => void;
  isSheetOpen: boolean;
  setIsSheetOpen: (v: boolean) => void;
  user: UserFetched | null;
  setUser: (v: any) => void;
  isFormSheetOpen: boolean;
  setIsFormSheetOpen: (v: boolean) => void;
  choosenId: string | undefined;
  setchoosenId: (v: string | undefined) => void;
};

export const useStore = create<Store>()(
  persist(
    (set) => ({
      choosenId: undefined,
      setchoosenId: (v) => set(() => ({ choosenId: v, isFormSheetOpen: !!v })),
      isFormSheetOpen: false,
      setIsFormSheetOpen: (v: boolean) => set(() => ({ isFormSheetOpen: v })),
      isSheetOpen: false,
      setIsSheetOpen: (v: boolean) => set(() => ({ isSheetOpen: v })),

      SideBarOpen: false,
      setSideBarOpen: (v: boolean) => set(() => ({ SideBarOpen: v })),
      user: null,
      setUser: (v) => set(() => ({ user: v })),
    }),
    { name: "data", storage: createJSONStorage(() => sessionStorage) }
  )
);
interface UserLoaderProps {
  userData: UserFetched | null;
}

export const UserLoader = ({ userData }: UserLoaderProps) => {
  const { setUser } = useStore((state) => state);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser(); // F
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };
    if (userData) {
      setUser(userData);
    } else {
      fetchUser();
    }
  }, []);

  return null;
};
