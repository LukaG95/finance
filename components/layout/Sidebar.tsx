'use client';

import Image from 'next/image';
import { useState } from 'react';
import SidebarButton from '../ui/SidebarButton';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { sidebarLinks, minimizeMenuLink } from '@/lib/constants';
import Link from 'next/link';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  return (
    <aside
      className={`text-preset-3 flex flex-col justify-between gap-300 pb-300 h-full bg-grey-900 rounded-r-[16px] transition-all duration-300 shrink-0 ${
        collapsed ? 'w-[88px]' : 'w-[300px]'
      }`}
    >
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

      <div className={`rounded-r-[12px] h-full flex flex-col gap-[4px] transition-padding duration-300 ${collapsed ? 'pr-100' : 'pr-300'}`}>
        {sidebarLinks.map((link) => (
          <Link href={link.href} key={link.href}>
            <SidebarButton
              width={link.width}
              height={link.height}
              iconPath={link.iconPath}
              text={link.text}
              showText={!collapsed}
              active={pathname === link.href}
            />
          </Link>
        ))}
      </div>

      <SidebarButton
        width={minimizeMenuLink.width}
        height={minimizeMenuLink.height}
        iconPath={minimizeMenuLink.iconPath}
        text="Minimize Menu"
        showText={!collapsed}
        onClick={() => setCollapsed(!collapsed)}
        imageClassName={collapsed ? 'rotate-180' : 'rotate-0'}
        extraMargin={'mb-300'}
      />

    </aside>
  );
}
