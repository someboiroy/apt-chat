import Sidebar from '@/components/sidebar';
import ChatHeader from '@/components/chat/chatHeader';
import ChatWindow from '@/components/chat/chatWindow';
import ChatInput from '@/components/chat/chatInput';

export default async function Chat() {
  return (
    <div className="flex w-screen h-screen">
      <Sidebar />
      <div className="flex flex-col overflow-hidden transition-all duration-200 ease-in-out w-fit">
        <ChatHeader />
        <ChatWindow />
        <ChatInput />
      </div>
    </div>
  );
}
