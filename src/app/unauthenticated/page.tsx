import LoginWithGithub from '@/components/githubLogin';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

export default async function Unauthenticated() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    redirect('/chat');
  }

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      {/* Main Container */}
      <div className="w-full max-w-lg m-6 ">
        {/* Text */}
        <div>
          <h1 className="text-4xl font-bold">Sorry...</h1>
          <h2 className="text-2xl font-light">
            You Need to Be Logged In to Chat.
          </h2>
          <LoginWithGithub />
        </div>
      </div>
    </div>
  );
}
