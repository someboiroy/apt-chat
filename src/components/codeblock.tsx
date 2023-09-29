'use client';
import React, { FC, useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coldarkDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import copy from 'clipboard-copy';
import { FaCopy, FaCheck } from 'react-icons/fa';

interface Props {
  language: string;
  value: string;
}

const CodeBlock: FC<Props> = ({ language, value }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = () => {
    copy(value);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 1200);
  };
  return (
    <div className="relative w-full font-sans codeblock bg-zinc-950">
      <div className="flex items-center justify-between w-full px-6 py-2 pr-4 bg-zinc-800 text-zinc-100">
        <span className="text-xs lowercase">{language}</span>
        <button
          onClick={handleCopyClick}
          className="flex items-center gap-2 p-2 text-sm text-white rounded bg-zinc-700 "
        >
          {isCopied ? <FaCheck /> : <FaCopy />}
          <span className="">{isCopied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <SyntaxHighlighter
        language={language}
        style={coldarkDark}
        PreTag="div"
        showLineNumbers
        customStyle={{
          margin: 0,
          width: '100%',
          background: 'transparent',
          padding: '1.5rem 1rem',
        }}
        codeTagProps={{
          style: {
            fontSize: '0.9rem',
            fontFamily: 'var(--font-mono)',
          },
        }}
      >
        {value}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
