import { Button } from '@/components/ui/button';
import { Combobox } from '@/components/ui/combobox';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { CreateNewChat } from '../headerButtons';
import { useStore } from '@/store';

import { FaBars } from 'react-icons/fa';
import ChatHeaderButton from './chatHeaderButton';

import Sidebar from '../sidebar';

interface ChatHeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

// const toggleSidebar = () => {
//   useStore.setState({ isSidebarOpen: !useStore.getState().isSidebarOpen });
// };

export default function ChatHeader() {
  return (
    <div
      className={`sticky top-0 gap-2 p-2  md:p-2 border-b-2 w-screen 
         bg-zinc-100 border-b-zinc-300`}
    >
      <div className="flex gap-2 text-center place-content-center md:items-center md:justify-between">
        <div className="text-xs md:flex md:items-center md:flex-1">
          <Combobox />
          <p className="mb-2 text-xs font-bold text-center md:mb-0 md:text-md md:ml-2">
            Select a{' '}
            <HoverCard>
              <HoverCardTrigger>
                <span className="underline underline-offset-1">Chat Focus</span>
              </HoverCardTrigger>
              <HoverCardContent className="text-xs font-medium md:text-sm">
                <span className="font-bold">Chat Focus</span> is how apt-chat
                has up-to-date knowledge.
                <br />
                <br />
                Without a selection apt-chat&apos;s knowledge is limited.
              </HoverCardContent>
            </HoverCard>
          </p>
        </div>
        <div className="grid justify-center gap-2 2">
          <CreateNewChat />
        </div>
      </div>
    </div>
  );
}
