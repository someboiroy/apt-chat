'use client';

import { CreateNewChat } from '@/components/clientButtons';
import { SidebarToggleButton } from '@/components/clientButtons';
import { useStore } from '@/store';

export default function ChatHeader() {
  const { isSidebarOpen } = useStore();
  return (
    <div
      className={`sticky top-0 gap-2 p-2  md:p-2 border-b-2 w-screen 
         bg-transparent border-b-zinc-200`}
    >
      <div className="">
        <div className="flex justify-between gap-2 ">
          {!isSidebarOpen ? (
            <SidebarToggleButton extraStyles="bg-violet-500 ring-1 ring-zinc-300" />
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
}
