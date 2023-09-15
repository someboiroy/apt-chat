'use client';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { FaBars } from 'react-icons/fa';
import { LogOut } from './headerButtons';
import Link from 'next/link';

interface SidebarProps {
  conversations:
    | {
        conversation_id: string;
        conversation_title: string | null;
      }[]
    | null;
}

export default function Sidebar({ conversations }: SidebarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  if (isSidebarOpen) {
    return (
      <div
        className={`transition-all border-r-1  ${
          isSidebarOpen ? 'w-2/3 md:w-1/4' : 'w-0 md:w-0'
        } bg-transparent bg-zinc-700`}
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
              onClick={() => {
                setIsSidebarOpen(false);
              }}
            >
              Close
            </Button>
          </div>
          {conversations?.map((convo) => {
            return (
              <div key={convo.conversation_id} className="flex flex-col m-2">
                <Link href={`/chat/${convo.conversation_id}`}>
                  <p className="text-white">{convo.conversation_title}</p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <Button
        className={`absolute m-2 mt-24 left-0 bg-violet-500 z-10 mb-2 bg-none md:mt-20 ${
          isSidebarOpen ? 'hidden' : ''
        }`}
        size={'icon'}
        variant={'default'}
        onClick={() => {
          setIsSidebarOpen(!isSidebarOpen);
        }}
      >
        <FaBars size={25} />
      </Button>
    );
  }
}
