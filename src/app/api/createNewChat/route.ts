import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '../../../../types/supabase';
import { NextRequest, NextResponse } from 'next/server';
import { redirect } from 'next/navigation';

export async function POST(req: NextRequest) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const user = await supabase.auth.getUser();
  const userID = user.data.user?.id;

  const { data, error } = await supabase
    .from('Conversations')
    .insert(
      [
        {
          user_id: userID,
          conversation_title: 'New Chat',
          created_at: new Date().toISOString(),
          focus: null,
        },
      ],
      { count: 'exact' }
    )
    .select();

  if (error) {
    console.error('Error creating new chat:', error);
  }
  const newConversationID = data![0].conversation_id;

  return new NextResponse(
    JSON.stringify(`${req.nextUrl.origin}/chat/${newConversationID}`)
  );
}

export async function CreateNewChat() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const user = await supabase.auth.getUser();
  const userID = user.data.user?.id;

  const { data, error } = await supabase
    .from('Conversations')
    .insert(
      [
        {
          user_id: userID,
          conversation_title: 'New Chat',
          created_at: new Date().toISOString(),
          focus: null,
        },
      ],
      { count: 'exact' }
    )
    .select();

  if (error) {
    console.error('Error creating new chat:', error);
  }
  const newConversationID = data![0].conversation_id;

  return NextResponse.json({ conversationID: newConversationID });

  // return new NextResponse(
  //   JSON.stringify(`${req.nextUrl.origin}/chat/${newConversationID}`)
  // );
}
