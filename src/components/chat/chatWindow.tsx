import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FaUser, FaRobot } from 'react-icons/fa';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '../../../types/supabase';
import { cookies } from 'next/headers';

interface message {
  content: string;
  conversation_id: string | null;
  created_at: string;
  message_id: string;
  role: string;
}

interface messageProps {
  messages: message[];
}

export default async function ChatWindow({ convoId }: { convoId: string }) {
  const supabase = createServerComponentClient<Database>({ cookies });

  let Messages: message[] | null = null;

  if (convoId) {
    const { data, error } = await supabase
      .from('Messages')
      .select('*')
      .eq('conversation_id', convoId);

    Messages = data;
  }

  return (
    <ScrollArea className="h-full">
      <div>
        <MessageList messages={Messages ?? []} />
      </div>
    </ScrollArea>
  );
}

function MessageList({ messages }: messageProps) {
  return (
    <>
      {messages.map((msg, index) => {
        const messageIcon = msg.role === 'user' ? <FaUser /> : <FaRobot />;
        const messageColor = msg.role === 'user' ? '' : '';

        return (
          <div key={index}>
            <div className="flex p-2 m-6 text-md md:text-lg">
              <div
                className={`p-1 md:p-2 m-1 md:m-2 rounded-md h-fit w-fit ring-2 ring-zinc-800 ${messageColor}`}
              >
                {messageIcon}
              </div>
              <div className={`p-1 md:p-2 leading-6 ${messageColor} `}>
                <p>{msg.content}</p>
              </div>
            </div>
            <Separator />
          </div>
        );
      })}
    </>
  );
}
