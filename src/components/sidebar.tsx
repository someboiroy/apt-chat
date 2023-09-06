import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
  conversations: any;
  selectConversation: (messages: any) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  closeSidebar,
  conversations,
  selectConversation,
}) => {
  const [selectedConversation, setSelectedConversation] = useState<
    number | null
  >(null);

  const handleSelectConversation = (index: number, messages: any) => {
    setSelectedConversation(index);
    selectConversation(messages);
  };

  return (
    <div
      className={`relative text-white shadow-lg h-full transition-all border-r-2 ${
        isOpen ? 'md:w-1/4' : 'w-0'
      } bg-transparent bg-zinc-700 overflow-x-hidden`}
    >
      <div className="p-4">
        <div className="items-center gap-2 pr-12 m-2 md:flex">
          <Button size={'lg'} className="mb-2 md:w-3/4" variant={'secondary'}>
            New Chat
          </Button>
          <Button
            size={'lg'}
            className="mb-2 md:w-1/4 "
            variant={'destructive'}
            onClick={closeSidebar}
          >
            Close
          </Button>
        </div>
        {/* List of Conversations */}
        <ul>
          {conversations.map((conversation: any, index: number) => (
            <li
              className={`p-2 my-2 rounded-md hover:bg-zinc-600  cursor-pointer ring-1 ring-zinc-300 ${
                selectedConversation === index ? 'bg-zinc-300/50 shadow-lg' : ''
              }`}
              key={index}
              onClick={() =>
                handleSelectConversation(index, conversation.messages)
              }
            >
              {conversation.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
