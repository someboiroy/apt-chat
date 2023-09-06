import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FaUser, FaRobot } from 'react-icons/fa';

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

export default ChatWindow;
