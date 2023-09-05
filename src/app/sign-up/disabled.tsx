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

const SignupForm = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      {/* Main Container */}
      <div className="w-full max-w-lg m-6">
        {/* Text */}
        <div>
          <h1 className="text-4xl font-bold">Sign Up</h1>
          <p className="mt-2 text-neutral-600">
            New to{' '}
            <span className="font-semibold text-neutral-800">apt-chat?</span>{' '}
            <br />
            <br />
            Create an account using your email or GitHub.
          </p>
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
            <div className="space-y-2">
              <Label>Confirm Password</Label>
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
            Signup with Email
            <Mail size="16" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
