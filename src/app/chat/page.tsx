import Chat from '@/components/chat/chat';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import LoginWithGithub from '@/components/githubLogin';

export const dynamic = 'force-dynamic';

export default async function ChatContainer() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/unauthenticated');
  }

  return <Chat />;
}
