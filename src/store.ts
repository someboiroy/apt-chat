import { create } from 'zustand';

type State = {
  isSidebarOpen: boolean;
  toggleSidebar: (isSidebarOpen: boolean) => void;
};

export const useStore = create<State>((set) => ({
  isSidebarOpen: true,
  toggleSidebar: (isSidebarOpen: boolean) => set({ isSidebarOpen }),
}));
