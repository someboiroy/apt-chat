import { cookies } from 'next/headers';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '../../../../types/supabase';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const supabase = createServerComponentClient<Database>({ cookies });
  const { conversation_id } = await req.json();

  const { error } = await supabase
    .from('Conversations')
    .delete()
    .eq('conversation_id', conversation_id);

  if (error) {
    return NextResponse.error();
  }

  return new NextResponse('Deleted conversation');
}
