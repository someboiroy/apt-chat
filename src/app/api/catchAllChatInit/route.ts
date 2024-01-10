import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '../../../../types/supabase';
import { NextRequest, NextResponse } from 'next/server';
import { ChatAPICall } from '../chat/route';

export async function POST(req: NextRequest) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const user = await supabase.auth.getUser();
  const userID = user.data.user?.id;

  const { messages } = await req.json();

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

  await 
  fetch('api/chat', {
    method: 'POST',
    body: JSON.stringify({
      conversationID: newConversationID,
      messages: messages,
    }),
  });

  return NextResponse.json({ conversationID: newConversationID });

  // return new NextResponse(
  //   JSON.stringify(`${req.nextUrl.origin}/chat/${data[0].conversation_id}`)
  // );
}
