'use client';

import Sidebar from '@/components/sidebar';
import ChatHeader from '@/components/chat/chatHeader';
import ChatWindow from '@/components/chat/chatWindow';
import ChatInput from '@/components/chat/chatInput';
import { useState } from 'react';

import testData from '../../app/chat/testData.json';

const Chat: React.FC = () => {
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

export default Chat;
