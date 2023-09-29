'use client';

import { Button } from '@/components/ui/button';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { useStore } from '../store';
import { FaBars } from 'react-icons/fa';
import { TbLogout, TbPlus } from 'react-icons/tb';

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

function CreateNewChat({ extraStyles }: { extraStyles?: string }) {
  const supabase = createClientComponentClient();

  const handleClick = async () => {};
  return (
    <Button
      size={'default'}
      onClick={() => handleClick()}
      className={`text-xs md:text-sm ${extraStyles}`}
    >
      New Chat <TbPlus size={16} />
    </Button>
  );
}

function SidebarToggleButton({ extraStyles }: { extraStyles?: string }) {
  const { isSidebarOpen, toggleSidebar } = useStore();

  return (
    <Button
      className={`${extraStyles}`}
      size={'default'}
      variant={'default'}
      onClick={() => toggleSidebar(isSidebarOpen)}
    >
      <FaBars size={25} />
    </Button>
  );
}

export { LogOut, CreateNewChat, SidebarToggleButton };
