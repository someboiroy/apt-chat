'use client';

import { Button } from '@/components/ui/button';
import { FaGithub } from 'react-icons/fa';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';

export default function LoginWithGithub() {
  const supabase = createClientComponentClient();

  const handleClick = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: { redirectTo: `${location.origin}/auth/callback` },
    });
  };

  return (
    <Button
      size={'default'}
      onClick={() => handleClick()}
      className="flex items-center gap-2 mt-4 w-fit"
    >
      Login w/ Github <FaGithub size="16" />
    </Button>
  );
}
