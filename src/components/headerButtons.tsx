'use client';

import { Button } from '@/components/ui/button';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

function LogOut() {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleClick = async () => {
    await supabase.auth.signOut();

    router.replace('/');
  };

  return (
    <Button
      size={'default'}
      variant={'destructive'}
      onClick={() => handleClick()}
      className="mb-2 text-xs md:mb-0 md:text-base"
    >
      Logout
    </Button>
  );
}

function CreateNewChat() {
  const supabase = createClientComponentClient();

  const handleClick = async () => {};

  return (
    <Button
      size={'default'}
      onClick={() => handleClick()}
      className="mb-2 text-xs md:mb-0 md:text-base"
    >
      New Chat
    </Button>
  );
}

export { LogOut, CreateNewChat };
