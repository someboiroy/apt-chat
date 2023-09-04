import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { FaRedo } from 'react-icons/fa';

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

export default ChatInput;
