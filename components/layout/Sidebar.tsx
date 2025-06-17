'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import SidebarButton from '../ui/SidebarButton';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { sidebarLinks, minimizeMenuLink } from '@/lib/constants';
import Link from 'next/link';
import useWindowDimensions from 'hooks/useWindowDimentions';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { s_width } = useWindowDimensions();

  return (
    <aside
      className={`
        text-preset-3 flex flex-col justify-between gap-300 pt-100 lg:pb-300 lg:pt-0 px-500 lg:px-0
        bg-grey-900 rounded-t-[8px] lg:rounded-t-none lg:rounded-r-[16px] transition-all duration-300 shrink-0
        ${collapsed ? 'lg:w-[88px]' : 'lg:w-[300px]'} w-full
      `}
    >
      {s_width > 1060 && (
        <div className="relative px-400 py-500 mb-300">
          <Image
            src="/images/logo-large.svg"
            alt="Logo large"
            width={121}
            height={21.5}
            onClick={() => router.push('/')}
            className={`absolute transition-opacity duration-300 cursor-pointer ${
              collapsed ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <Image
            src="/images/logo-small.svg"
            alt="Logo small"
            width={13.7}
            height={21.5}
            onClick={() => router.push('/')}
            className={`absolute transition-all duration-300 cursor-pointer ${
              collapsed ? 'opacity-100 translate-x-[5px]' : 'opacity-0 translate-x-[0px]'
            }`}
          />
        </div>
      )}

      <div className={`rounded-r-[12px] h-full flex flex-row justify-between lg:justify-normal gap-[4px] transition-padding duration-300 ${collapsed ? 'pr-100' : 'pr-300'} lg:flex-col`}>
        {sidebarLinks.map((link) => (
          <Link href={link.href} key={link.href}>
            <SidebarButton
              width={link.width}
              height={link.height}
              iconPath={link.iconPath}
              text={link.text}
              showText={!collapsed || s_width < 1060}
              active={pathname === link.href}
            />
          </Link>
        ))}
      </div>

      {s_width > 1060 && (
        <SidebarButton
          width={minimizeMenuLink.width}
          height={minimizeMenuLink.height}
          iconPath={minimizeMenuLink.iconPath}
          text="Minimize Menu"
          showText={!collapsed || s_width < 1060}
          onClick={() => setCollapsed(!collapsed)}
          imageClassName={collapsed ? 'rotate-180' : 'rotate-0'}
          extraMargin={'mb-300'}
        />
      )}
    </aside>
  );
}
