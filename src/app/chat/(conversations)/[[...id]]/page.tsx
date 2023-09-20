import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import Sidebar from '@/components/sidebar';
import ChatHeader from '@/components/chat/chatHeader';
import ChatWindow from '@/components/chat/chatWindow';
import ChatInput from '@/components/chat/chatInput';
import type { Database } from '../../../../../types/supabase';

export const dynamic = 'force-dynamic';

interface pageProps {
  params: {
    id: string;
  };
}

export default async function Chat({ params }: pageProps) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const user = await supabase.auth.getUser();

  const userInfo = {
    name: user.data.user?.user_metadata.full_name,
    avatar_url: user.data.user?.user_metadata.avatar_url,
  };

  const { data: Converstations, error } = await supabase
    .from('Conversations')
    .select('conversation_id, conversation_title');

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/unauthenticated');
  }

  return (
    <div className="flex w-screen h-screen">
      <Sidebar conversations={Converstations} user={userInfo} />
      <div className="flex flex-col w-full overflow-hidden transition-all duration-200 ease-in-out">
        <ChatHeader />
        <ChatWindow convoId={params.id} />
        <ChatInput />
      </div>
    </div>
  );
}
