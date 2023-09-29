'use client';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Combobox } from '@/components/ui/combobox';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { FaRedo, FaInfo } from 'react-icons/fa';
import { useChat } from 'ai/react';
import { TbBrandOpenai } from 'react-icons/tb';
import { AiOutlineUser } from 'react-icons/ai';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import CodeBlock from '@/components/codeblock';

import React from 'react';
import type { Message } from 'ai';

interface ChatWindowProps {
  conversation_id: string;
  prevMessages: Message[];
}

export default function ChatWindow({
  conversation_id,
  prevMessages,
}: ChatWindowProps) {
  const lastMessageRef = React.useRef<HTMLDivElement>(null);

  const { messages, input, handleInputChange, handleSubmit, reload } = useChat({
    api: '/api/chat',
    initialMessages: prevMessages,
    sendExtraMessageFields: true,
    body: {
      conversationID: conversation_id,
    },
    onResponse: (res) => {
      console.log(res);
    },
  });
  React.useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // const handleSend = () => {
  //   // You can add any additional logic here before sending a message
  //   handleSubmit();
  // };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <ScrollArea className="relative flex-grow overflow-y-auto">
        <div>
          {messages.map((msg, index) => {
            const messageIcon =
              msg.role === 'user' ? (
                <AiOutlineUser size={20} />
              ) : (
                <TbBrandOpenai size={20} />
              );
            const messageColor = msg.role === 'user' ? '' : 'bg-zinc-100';

            return (
              <div className={` ${messageColor}`} key={index}>
                <div className="flex items-center p-6 ">
                  <div
                    className={`p-1 md:p-2 m-1 md:m-2 bg-white justo h-fit rounded-md w-fit ring-1 ring-zinc-400 ${messageColor}`}
                  >
                    {messageIcon}
                  </div>
                  <div className={`p-1 md:p-2 leading-6 text-zinc-700`}>
                    <ReactMarkdown
                      className="text-xl prose break-words break dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
                      remarkPlugins={[remarkGfm, remarkMath]}
                      components={{
                        code: ({
                          node,
                          className,
                          children,
                          ...props
                        }: any) => {
                          const inline = (props as any).inline;

                          const match = /language-(\w+)/.exec(className || '');
                          return !inline && match ? (
                            <CodeBlock
                              language={match[1]}
                              value={String(children).replace(/\n$/, '')}
                              {...props}
                            />
                          ) : (
                            <code className={className} {...props}>
                              {children}
                            </code>
                          );
                        },
                      }}
                    >
                      {msg.content}
                    </ReactMarkdown>{' '}
                  </div>
                </div>
                <Separator />
              </div>
            );
          })}
          <div ref={lastMessageRef}></div>
        </div>
      </ScrollArea>
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
              Chat Focus is how apt-chat has up-to-date knowledge. Without a
              selection, apt-chat&apos;s knowledge is limited.
            </HoverCardContent>
          </HoverCard>
        </div>
        <form onSubmit={handleSubmit}>
          <Textarea
            className="p-2 mb-2 text-xs bg-white resize-none md:text-base ring-zinc-200 ring-1"
            placeholder="Type your message here."
            value={input}
            onChange={handleInputChange}
          />
          <div className="flex gap-1 md:gap-2">
            <Button className="w-full text-xs md:text-base">
              Send message
            </Button>
            <Button
              onClick={() => reload()}
              className="bg-violet-500"
              size={'icon'}
            >
              <FaRedo size={16} />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
