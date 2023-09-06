'use client';

import { useState, useEffect } from 'react';
import TextTransition, { presets } from 'react-text-transition';

const TEXTS = ['developers.', 'programmers.', 'engineers.'];

const TextTransitionComponent: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((prevIndex) => prevIndex + 1),
      3000
    );
    return () => clearTimeout(intervalId);
  }, []);

  return (
    <TextTransition
      springConfig={presets.gentle}
      className="text-2xl font-semibold tracking-tight scroll-m-20"
    >
      {TEXTS[index % TEXTS.length]}
    </TextTransition>
  );
};

export default TextTransitionComponent;
