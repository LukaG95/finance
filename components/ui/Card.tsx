import React from 'react';
import clsx from 'clsx';

type CardProps = {
  children?: React.ReactNode;
  className?: string;
  variant?: 'light' | 'dark'; 
};

export default function Card({ children, className = '', variant = 'light' }: CardProps) {
  return (
    <div
      className={clsx(
        'w-full',
        'text-grey-900',
        'p-400',
        'rounded-xl',
        variant === 'light' ? 'bg-white' : 'bg-grey-900 text-white',
        className
      )}
    >
      {children}
    </div>
  );
}