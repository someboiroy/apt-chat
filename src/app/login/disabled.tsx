'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FaGithub as Github } from 'react-icons/fa';
import { AiOutlineMail as Mail } from 'react-icons/ai';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const handleSubmit = () => {
  console.log('clicked');
};

const error = null;

const LoginForm = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      {/* Main Container */}
      <div className="w-full max-w-lg m-6">
        {/* Text */}
        <div>
          <h1 className="text-4xl font-bold">Login</h1>
          <p className="mt-2 text-neutral-600">
            Welcome to{' '}
            <span className="font-semibold text-neutral-800">apt-chat.</span>{' '}
            <br />
            <br />
            Please login to your account by email or GitHub.
          </p>
        </div>
        {/* Github Button */}
        <Button
          onClick={() => console.log('clicked')}
          className="flex items-center w-full gap-2 mt-6"
        >
          Login with Github <Github size="16" />
        </Button>
        {/* Separator */}
        <div className="flex items-center my-8">
          <div className="flex-grow border-t border-neutral-300"></div>
          <span className="mx-6 text-neutral-600">OR</span>
          <div className="flex-grow border-t border-neutral-300"></div>
        </div>
        {/* Form Container */}
        <form onSubmit={handleSubmit}>
          {/* Inputs Container */}
          <div className="mt-6 space-y-6">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input />
            </div>
            <div className="space-y-2">
              <Label>Password</Label>
              <Input />
            </div>
          </div>
          {/* Error */}
          {error && <div className="mt-4 text-red-500">{error}</div>}
          <Button
            variant="default"
            type="submit"
            className="flex items-center w-full gap-2 mt-6"
          >
            Login with Email
            <Mail size="16" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
