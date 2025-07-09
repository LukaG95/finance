'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import classNames from 'classnames';
import clsx from 'clsx';

type Props = {
  label?: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
  iconSrc?: string;
  buttonWidth?: string;
  dropdownWidth?: string;
  wrapperClassName?: string;
  variant?: 'default' | 'modal';
};

export default function DropdownButton({
  label,
  options,
  value,
  onChange,
  iconSrc = '/images/icon-caret-down.svg',
  buttonWidth,
  wrapperClassName = '',
  variant = 'default'
}: Props) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isModal = variant === 'modal';

  return (
    <div className={clsx("flex items-center gap-100 relative", wrapperClassName)} ref={dropdownRef}>
      {label && (
        <label className="text-preset-4 text-grey-500 whitespace-nowrap hidden md:block">
          {label}
        </label>
      )}
      <div className={`relative ${isModal ? 'w-full' : 'w-max'}`}>
        <button
          onClick={() => setOpen((prev) => !prev)}
          className={classNames(
            'flex justify-between gap-200 px-150 rounded-[8px] text-preset-4 cursor-pointer hover:bg-grey-100 active:bg-grey-300 transition-bg duration-200',
            isModal ? 'py-[11px] border border-beige-500' : 'md:px-250 py-[14px] md:py-[11px] md:border border-beige-500',
            buttonWidth
          )}
        >
          <span className={clsx(variant === 'modal' ? 'inline' : 'hidden md:inline')}>
            {value}
          </span>
          <>
            <Image
              src={iconSrc}
              alt="icon"
              width={16}
              height={16}
              className={isModal ? '' : 'md:hidden'}
            />
            {!isModal && (
              <Image
                src="/images/icon-caret-down.svg"
                alt="toggle"
                width={12}
                height={6}
                className={classNames(
                  'transition-transform duration-200 hidden md:block group-hover:brightness-300',
                  open ? 'rotate-180' : ''
                )}
              />
            )}
          </>
        </button>
        <div
          className={classNames(
            'absolute top-full right-0 mt-100 bg-white rounded-[8px] shadow-[0px_4px_24px_rgba(0,0,0,0.25)] max-h-[300px] overflow-scroll transition-all duration-200 origin-top transform',
            open ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none',
            buttonWidth, 'min-w-max'
          )}
        >
          <ul className="text-preset-4">
            {options.map((option) => (
              <li
                key={option}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={classNames(
                  'px-250 py-150 cursor-pointer hover:bg-grey-100 whitespace-nowrap',
                  value === option ? 'font-bold text-grey-900' : ''
                )}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
