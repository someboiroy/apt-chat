// app/api/chat/route.ts

import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse, Message } from 'ai';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '../../../../types/supabase';
import { customAlphabet } from 'nanoid';
import { CreateNewChat } from '../createNewChat/route';
import { NextRequest, NextResponse } from 'next/server';
import { redirect } from 'next/navigation';

// Optional, but recommended: run on the edge runtime.
// See https://vercel.com/docs/concepts/functions/edge-functions
export const runtime = 'edge';

const nanoid = customAlphabet(
  '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
  7
);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  console.log('API Endpoint Hit');

  // Extract the `messages` from the body of the request
  const { messages, conversationID } = await req.json();

  if (conversationID) {
    return Chat(messages, conversationID);
  } else {
    const res = await CreateNewChat();
    const data = await res.json();
    const newConversationID = data.conversationID;
    await Chat(messages, newConversationID).then(() => {
      redirect(`${req.url}/chat/${newConversationID}`);
    });
  }
}

async function Chat(messages: Message[], conversationID: string) {
  const supabase = createServerComponentClient<Database>({ cookies });
  console.log('API Endpoint Hit');

  // console.log('messages:', messages);
  // console.log('conversationID:', conversationID);

  // // update the conversation title
  // const { data, error: updateError } = await supabase
  //   .from('Conversations')
  //   .update({ conversation_title: messages[0].content.substring(0, 50) })
  //   .eq('conversation_id', conversationID)
  //   .select();

  // if (updateError) {
  //   console.error('Error updating conversation title:', updateError);
  // }

  // Request the OpenAI API for the response based on the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: messages.map((message: Message) => ({
      content: message.content,
      role: message.role,
    })),
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response, {
    onStart: async () => {
      const lastMessage = messages.slice(-1)[0];
      if (lastMessage) {
        const { data: insertData, error: insertError } = await supabase
          .from('Messages')
          .insert(
            [
              {
                content: lastMessage.content,
                conversation_id: conversationID,
                created_at: lastMessage.createdAt!.toString(),
                message_id: lastMessage.id,
                role: lastMessage.role,
              },
            ],
            { count: 'exact' }
          );
        if (insertError) {
          console.error('Error saving prompt message:', insertError);
        }
      }
    },

    onCompletion: async (completion: string) => {
      const { data: insertData, error: insertError } = await supabase
        .from('Messages')
        .insert(
          [
            {
              content: completion,
              conversation_id: conversationID,
              created_at: new Date().toISOString(),
              message_id: nanoid(),
              role: 'assistant',
            },
          ],
          { count: 'exact' }
        );
      if (insertError) {
        console.error('Error saving completion message:', insertError);
      }
    },
  });

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
