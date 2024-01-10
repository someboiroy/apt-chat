import { create } from 'zustand';
import { Message } from 'ai';

type SideBarState = {
  isSidebarOpen: boolean;
  toggleSidebar: (isSidebarOpen: boolean) => void;
};

type ChatState = {
  initMessage: string;
  setInitMessages: (initMessage: string) => void;
};

export const useInitialChatStore = create<ChatState>((set) => ({
  initMessage: '',
  setInitMessages: (message: string) => set({ initMessage: message }),
}));

export const useStore = create<SideBarState>((set) => ({
  isSidebarOpen: true,
  toggleSidebar: (isSidebarOpen: boolean) =>
    set({ isSidebarOpen: !isSidebarOpen }),
}));
