'use client';

import { Button } from '@/components/ui/button';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useStore } from '../store';
import { FaBars } from 'react-icons/fa';
import { TbLogout, TbPlus, TbTrash } from 'react-icons/tb';
import { redirect } from 'next/navigation';

// TODO: ADD Toasts for success and error

function LogOut() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleClick = async () => {
    await supabase.auth.signOut();

    router.replace('/');
  };

  return (
    <Button
      size={'lg'}
      variant={'destructive'}
      onClick={() => handleClick()}
      className="inline-flex p-2 mb-2 text-xs w-fit md:mb-0 "
    >
      <TbLogout size={20} />
      Log 0ut
    </Button>
  );
}

const handleNewChatClick = async () => {
  const res = await fetch('/api/createNewChat', {
    method: 'POST',
  });
  const newURL = await res.json();

  return newURL;
};

function CreateNewChatButton({ extraStyles }: { extraStyles?: string }) {
  const router = useRouter();

  return (
    <Button
      size={'lg'}
      onClick={() =>
        handleNewChatClick().then((url: string) => router.push(url))
      }
      className={`${extraStyles}`}
    >
      New Chat
    </Button>
  );
}

const handleDeleteChatClick = async (convoID: string) => {
  const res = await fetch('/api/deleteChat', {
    method: 'POST',
    body: JSON.stringify({
      conversation_id: convoID,
    }),
  });
};

function DeleteChatButton({
  extraStyles,
  convoID,
}: {
  extraStyles?: string;
  convoID: string;
}) {
  const router = useRouter();
  return (
    <Button
      size={'sm'}
      variant={'ghost'}
      onClick={() =>
        handleDeleteChatClick(convoID).then(() => router.replace('/chat'))
      }
      className={`text-xs p-1 ${extraStyles}`}
    >
      <TbTrash color={'white'} className={'hover:text-black'} size={20} />
    </Button>
  );
}

function SidebarToggleButton({ extraStyles }: { extraStyles?: string }) {
  const { isSidebarOpen, toggleSidebar } = useStore();

  return (
    <Button
      className={`p-6 ${extraStyles}`}
      size={'default'}
      variant={'default'}
      onClick={() => toggleSidebar(isSidebarOpen)}
    >
      <FaBars size={25} />
    </Button>
  );
}

export { LogOut, SidebarToggleButton, CreateNewChatButton, DeleteChatButton };
