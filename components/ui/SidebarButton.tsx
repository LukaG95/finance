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
    <button
      onClick={onClick}
      className={`
        relative group py-200 transition-colors duration-300 cursor-pointer lg:w-full w-[104px] lg:px-400 lg:rounded-r-[12px] rounded-t-[8px] overflow-hidden
        ${active ? 'bg-beige-100' : ''}
        ${extraMargin}
     
      `}
    >
      {
        <div
          className={`
            absolute h-50 w-full bg-green bottom-0 left-0 lg:w-50 lg:h-full 
            transition-opacity duration-300 
            ${active ? 'opacity-100' : 'opacity-0'}
          `}
        ></div>
      }
      <div className="relative flex flex-col transition-all duration-300 cursor-pointer lg:flex-row m-auto">
        <div className="w-[24px] h-[24px] flex items-center self-center justify-center shrink-0">
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
              transition-opacity duration-300 mt-[4px] lg:mt-0 lg:ml-200 whitespace-nowrap
              text-preset-5 lg:!text-[16px] lg:!font-bold
              ${showText ? 'opacity-100' : 'opacity-0'}
              text-grey-300 ${active ? 'text-grey-900' : 'group-hover:text-grey-100'}
            `}
          >
            {text}
          </span>
        )}
      </div>
    </button>
  );
}
