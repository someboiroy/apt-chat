import { Button } from '@/components/ui/button';
import { Combobox } from '@/components/ui/combobox';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { LogOut, CreateNewChat } from '../headerButtons';

import { FaBars } from 'react-icons/fa';

interface ChatHeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

// Chat Header
const ChatHeader: React.FC<ChatHeaderProps> = ({
  toggleSidebar,
  isSidebarOpen,
}) => {
  return (
    <div
      className={`sticky top-0 flex gap-2 justify-between p-4 md:p-2 border-b-2 w-full ${
        isSidebarOpen ? 'pointer-events-none' : ''
      } bg-zinc-100 border-b-zinc-300`}
    >
      <Button
        className={`mb-2 md:mb-0 ${isSidebarOpen ? 'hidden' : ''}`}
        size={'icon'}
        variant={'outline'}
        onClick={toggleSidebar}
      >
        <FaBars size={20} />
      </Button>
      <div className="items-center md:flex">
        <div className="text-xs md:text-base">
          <Combobox />
        </div>
        <p className="text-xs font-bold text-center md:text-md md:ml-2">
          Select a{' '}
          <HoverCard>
            <HoverCardTrigger>
              <span className="underline underline-offset-1">Chat Focus</span>
            </HoverCardTrigger>
            <HoverCardContent className="text-xs font-medium md:text-sm">
              <span className="font-bold">Chat Focus</span> is how apt-chat has
              up-to-date knowledge.
              <br />
              <br />
              Without a selection apt-chat&apos;s knowledge is limited.
            </HoverCardContent>
          </HoverCard>
        </p>
      </div>
      <div className="flex gap-2">
        <CreateNewChat />
        <LogOut />
      </div>
    </div>
  );
};

export default ChatHeader;
