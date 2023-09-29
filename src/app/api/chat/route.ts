// app/api/chat/route.ts

import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse, Message } from 'ai';
import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '../../../../types/supabase';
import { customAlphabet } from 'nanoid';

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
  const supabase = createServerComponentClient<Database>({ cookies });

  // Extract the `messages` from the body of the request
  const { messages, conversationID } = await req.json();

  // update the conversation title
  const { data } = await supabase
    .from('Conversations')
    .update({ conversation_title: messages[0].content.substring(0, 100) })
    .eq('conversation_id', conversationID)
    .select();

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
      // console.log('in:', {
      //   content: messages.slice(-1)[0].content,
      //   conversation_id: conversationID,
      //   created_at: messages.slice(-1)[0].createdAt,
      //   message_id: messages.slice(-1)[0].id,
      //   role: messages.slice(-1)[0].role,
      // });

      const { error } = await supabase.from('Messages').insert(
        [
          {
            content: messages.slice(-1)[0].content,
            conversation_id: conversationID,
            created_at: messages.slice(-1)[0].createdAt,
            message_id: messages.slice(-1)[0].id,
            role: messages.slice(-1)[0].role,
          },
        ],
        { count: 'exact' }
      );
      if (error) {
        console.error(error);
      }
    },

    onCompletion: async (completion: string) => {
      // console.log('out:', {
      //   content: completion,
      //   conversation_id: conversationID,
      //   created_at: new Date().toISOString(),
      //   message_id: nanoid(),
      //   role: 'assistant',
      // });

      const { error } = await supabase.from('Messages').insert(
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
      if (error) {
        console.error(error);
      }
    },
  });

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
