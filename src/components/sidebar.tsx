'use client';

import {
  LogOut,
  SidebarToggleButton,
  CreateNewChat,
} from '@/components/clientButtons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '@/store';
import { PiChatCircleBold } from 'react-icons/pi';

interface SidebarProps {
  user: {
    name: string;
    avatar_url: string;
  };

  conversations:
    | {
        conversation_id: string;
        conversation_title: string | null;
      }[]
    | null;
}

export default function Sidebar({ conversations, user }: SidebarProps) {
  const { isSidebarOpen } = useStore();
  const pathname = usePathname();

  if (isSidebarOpen) {
    return (
      <div
        className={`transition-all border-r-1 ${
          isSidebarOpen ? 'w-2/3 md:w-1/6' : 'w-0 md:w-0'
        } bg-transparent bg-zinc-800`}
      >
        <div className="flex flex-col h-full p-2">
          <div className="flex items-center gap-2 m-2">
            <CreateNewChat
              extraStyles={'w-full bg-zinc-200/20 hover:bg-zinc-600'}
            />
            <SidebarToggleButton
              extraStyles={'bg-zinc-200/20  hover:bg-zinc-600'}
            />
          </div>
          <div className="mt-6">
            {conversations?.map((convo) => {
              let focus =
                pathname == `/chat/${convo.conversation_id}`
                  ? 'bg-violet-200/40'
                  : '';
              return (
                <div
                  key={convo.conversation_id}
                  className={`flex flex-col p-2 m-2 rounded-md    hover:bg-zinc-600 bg-zinc-200/20  ${focus}`}
                >
                  <Link
                    className="md:text-md"
                    href={`/chat/${convo.conversation_id}`}
                  >
                    <div className="flex items-center gap-2">
                      <PiChatCircleBold size={18} className="text-white" />

                      <p className="text-white">{convo.conversation_title}</p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
          <div className="gap-2 p-2 mt-auto ">
            <div className="flex items-center justify-between gap-2 p-2 mb-2 rounded-md ring-1 ring-zinc-200/30">
              <div className="flex items-center gap-2 ">
                <Avatar>
                  <AvatarImage src={user.avatar_url} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h1 className="font-mono text-xs font-semibold text-white uppercase">
                  {user.name}
                </h1>
              </div>

              <div>
                <LogOut />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return;
  }
}
