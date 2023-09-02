'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Combobox } from '@/components/ui/combobox';
import { ScrollArea } from '@/components/ui/scroll-area';
import Sidebar from '@/components/sidebar';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { FaUser, FaRobot, FaRedo, FaBars } from 'react-icons/fa';
import { useState } from 'react';

import * as testData from './testData.json';

// Chat Container
interface ChatHeaderProps {
  toggleSidebar: () => void;
  isSidebarOpen: boolean;
}

const ChatContainer: React.FC = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [conversations, setConversations] = useState(testData.conversations);
  const [currentMessages, setCurrentMessages] = useState([]);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const selectConversation = (messages: any) => {
    setCurrentMessages(messages);
  };

  return (
    <Chat
      isSidebarOpen={isSidebarOpen}
      toggleSidebar={toggleSidebar}
      conversations={conversations}
      currentMessages={currentMessages}
      selectConversation={selectConversation}
    />
  );
};

interface ChatProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  conversations: any; // Specify the actual type here
  currentMessages: IMessage[];
  selectConversation: (messages: any) => void;
}

const Chat: React.FC<ChatProps> = ({
  isSidebarOpen,
  toggleSidebar,
  conversations,
  currentMessages,
  selectConversation,
}) => {
  return (
    <div className="flex w-screen h-screen ">
      <Sidebar
        isOpen={isSidebarOpen}
        closeSidebar={toggleSidebar}
        conversations={conversations}
        selectConversation={selectConversation}
      />
      <div
        className={`flex flex-col w-full transition-all duration-200 ease-in-out ${
          isSidebarOpen ? 'md:w-3/4' : 'md:w-full'
        }`}
      >
        <ChatHeader
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
        />
        <ChatWindow messages={currentMessages} />
        <ChatInput />
      </div>
    </div>
  );
};

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
      <Button className="mb-2 text-xs md:mb-0 md:text-base">New Chat</Button>
    </div>
  );
};

// Chat Window
interface IMessage {
  sender: 'user' | 'bot';
  text: string;
}

interface ChatWindowProps {
  messages: IMessage[];
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
  return (
    <ScrollArea className="h-full">
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <Message key={index} sender={message.sender} text={message.text} />
            {messages[index + 1] && <Separator className="my-4" />}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

// Chat Input
const ChatInput: React.FC = () => {
  return (
    <div className="sticky bottom-0 left-0 right-0 grid w-full gap-1 p-2 border-t-2 md:gap-2 md:p-4 min-w-min bg-zinc-100">
      <Textarea
        className="p-2 text-xs bg-white resize-none md:text-base ring-zinc-200 ring-1 h-fit"
        placeholder="Type your message here."
      />
      <div className="flex gap-1 md:gap-2">
        <Button className="w-full text-xs md:text-base">Send message</Button>
        <Button className="bg-violet-500" size={'icon'}>
          <FaRedo size={16} />
        </Button>
      </div>
    </div>
  );
};

// Message Component
const Message: React.FC<IMessage> = ({ sender, text }) => {
  const messageIcon = sender === 'user' ? <FaUser /> : <FaRobot />;
  const messageColor = sender === 'user' ? '' : '';

  return (
    <div className="flex p-2 text-md md:text-lg">
      <div
        className={`p-1 md:p-2 m-1 md:m-2 rounded-md h-fit w-fit ring-2 ring-zinc-300 ${messageColor}`}
      >
        {messageIcon}
      </div>
      <div className={`p-1 md:p-2 leading-6 ${messageColor} `}>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default ChatContainer;
