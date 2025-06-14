'use client';

import Image from 'next/image';

type SidebarButtonProps = {
  iconSrc: string;
  text?: string;
  showText?: boolean; // controls text visibility
  onClick?: () => void;
  imageClassName?: string; // customize Image transition per button
  extraMargin?: string;
};

export default function SidebarButton({
  iconSrc,
  text,
  showText = true,
  onClick,
  imageClassName = '',
  extraMargin = ''
}: SidebarButtonProps) {
  return (
    <div className={`px-400 py-200 ${extraMargin}`}>
      <button
        onClick={onClick}
        className="relative bg-grey-700 text-whiterounded flex transition-all duration-300"
        style={{ width: '100%', maxWidth: '200px' }}
      >
        <Image
          src={iconSrc}
          alt={text ?? 'Sidebar button'}
          width={19.5}
          height={19.5}
          className={`transition-transform duration-300 ${imageClassName} shrink-0`}
        />

        {text && (
          <span
            className={`transition-opacity duration-300 ml-200 whitespace-nowrap text-grey-300 ${
              showText ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {text}
          </span>
        )}
      </button>
    </div>
  );
}
