import { Button } from '@/components/ui/button';
import TextTransition from '@/components/textTransition';
import {
  FaRegClock,
  FaHandsHelping,
  FaCode,
  FaGithub,
  FaTwitter,
} from 'react-icons/fa';

const LandingPage = () => {
  return (
    <div className="m-6">
      <div className="grid gap-2 text-center rounded-lg shadow-xl shadow-violet-400/50 p-14 place-items-center ring-1 ring-gray-300 bg-zinc-200 bg-[url('../../public/card-bg.svg')]">
        <h1 className="text-4xl font-extrabold tracking-tight scroll-m-20 md:text-6xl lg:text-8xl">
          apt-chat.
        </h1>
        <div className="flex font-sans text-2xl italic text-center text-black">
          a chatbot for &#8202;
          <TextTransition />
        </div>
        <a href="https://tally.so/r/wbj6RZ">
          <Button className="mt-2">join the waitlist.</Button>
        </a>
      </div>
      <div className="flex flex-col gap-4 mt-6 md:flex-row">
        <div className="w-full p-12 shadow-xl rounded-xl md:w-1/3 bg-zinc-200 ring-1 ring-gray-300">
          <h1 className="text-4xl font-extrabold tracking-tight scroll-m-20 md:text-5xl">
            <FaRegClock size={48} className="mb-6" />
            Always Current.
          </h1>
          <p className="text-lg leading-7 font-medium [&:not(:first-child)]:mt-6">
            Keeps up with latest API and framework changes.
          </p>
        </div>
        <div className="w-full p-12 shadow-xl rounded-xl md:w-1/3 bg-zinc-200 ring-1 ring-gray-300">
          <h1 className="text-4xl font-extrabold tracking-tight scroll-m-20 md:text-5xl">
            <FaHandsHelping size={48} className="mb-6" />
            Helps When ChatGPT Can&apos;t.
          </h1>
          <p className="text-lg leading-7 font-medium [&:not(:first-child)]:mt-6">
            Stop worrying about knowledge cutoffs and extreme hallucination.
          </p>
        </div>
        <div className="w-full p-12 shadow-xl rounded-xl md:w-1/3 bg-zinc-200 ring-1 ring-gray-300">
          <h1 className="text-4xl font-extrabold tracking-tight scroll-m-20 md:text-5xl">
            <FaCode size={48} className="mb-6" />
            APIs, Frameworks, and More.
          </h1>
          <p className="text-lg font-medium leading-7 [&:not(:first-child)]:mt-6">
            Get help with anything from React to Python to Java.
          </p>
        </div>
      </div>
      <footer className="text-left rounded-md mt-28 ">
        <div className="">
          <div className="flex space-x-4">
            <a
              href="https://github.com/your-github-username"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub size={24} />
            </a>
            <a
              href="https://twitter.com/your-twitter-handle"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter size={24} />
            </a>
          </div>
          <p className="mt-2 text-xs font-thin">© 11_0000_1000_CORP</p>
        </div>
      </footer>
    </div>
  );
};
export default LandingPage;
