import React from 'react';
import { cn } from '@/lib/utils';

interface SplitTextProps {
  text: string;
  className?: string;
  spanClassName?: string;
}

export const SplitText = ({ text, className, spanClassName }: SplitTextProps) => {
  const words = text.split(/\s+/).filter(Boolean);

  return (
    <span className={cn('inline-block', className)}>
      {words.map((word, idx) => (
        <span
          key={idx}
          className="inline-block overflow-hidden mr-[0.22em] last:mr-0 align-bottom"
        >
          <span className={cn('inline-block split-word', spanClassName)}>
            {word}
          </span>
        </span>
      ))}
    </span>
  );
};
