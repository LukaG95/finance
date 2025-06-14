'use client';

type SidebarButtonProps = {
  height: string;
  width: string;
  iconPath: string;
  text?: string;
  showText?: boolean;
  onClick?: () => void;
  imageClassName?: string;
  extraMargin?: string;
  href?: string;
  active?: boolean;
};

export default function SidebarButton({
  height,
  width,
  iconPath,
  text,
  showText = true,
  onClick,
  imageClassName = '',
  extraMargin = '',
  active = false
}: SidebarButtonProps) {

  return (
    <div
      onClick={onClick}
      className={`relative group px-400 py-200 ${active && "bg-beige-100"} transition-colors duration-300 cursor-pointer ${extraMargin} rounded-r-[12px]`}
    >
      {
        <div
          className={`
            absolute h-full w-50 bg-green top-0 left-0 
            transition-opacity duration-300
            ${active ? 'opacity-100' : 'opacity-0'}
          `}
        ></div>
      }
      <button className="relative flex transition-all duration-300 cursor-pointer">
        <div className="w-[24px] h-[24px] flex items-center justify-center shrink-0">
          <svg
            style={{width: width, height: height}}
            className={`${active ? 'text-green' : 'text-grey-300 group-hover:text-grey-100'} transition-transform duration-300 ${imageClassName}`}
            fill="currentColor"
          >
            <path d={iconPath} />
          </svg>
        </div>

        {text && (
          <span
            className={`
              transition-opacity duration-300 ml-200 whitespace-nowrap
              ${showText ? 'opacity-100' : 'opacity-0'}
              text-grey-300 ${active ? 'text-grey-900' : 'group-hover:text-grey-100'}
            `}
          >
            {text}
          </span>
        )}
      </button>
    </div>
  );
}
