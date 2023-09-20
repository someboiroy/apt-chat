import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { FaRedo, FaInfo } from 'react-icons/fa';
import { Combobox } from '@/components/ui/combobox';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';

const ChatInput: React.FC = () => {
  return (
    <div className="sticky bottom-0 left-0 right-0 grid w-full gap-1 p-2 border-t-2 md:gap-2 md:p-2 min-w-min bg-zinc-100/50">
      <div className="flex text-xs md:items-center md:flex-1">
        <Combobox />
        <HoverCard>
          <HoverCardTrigger>
            <div className="p-2 m-2 underline rounded-full ring-1 ring-zinc-300">
              <FaInfo size={12} />
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="text-xs font-medium md:text-sm">
            <span className="font-bold">Chat Focus</span> is how apt-chat has
            up-to-date knowledge.
            <br />
            <br />
            Without a selection apt-chat&apos;s knowledge is limited.
          </HoverCardContent>
        </HoverCard>
      </div>
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
