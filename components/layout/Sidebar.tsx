'use client';

import Image from 'next/image';
import { useState } from 'react';
import SidebarButton from '../ui/SidebarButton';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`text-preset-3 flex flex-col justify-between gap-300 pb-300 h-[100%] bg-grey-900 rounded-r-[16px] transition-all duration-300 ${
        collapsed ? 'w-[88px]' : 'w-[300px]'
      }`}
    >
      <div className="relative px-400 py-500 mb-300">
        <Image
          src="/images/logo-large.svg"
          alt="Logo large"
          width={121}
          height={21.5}
          className={`absolute transition-opacity duration-300 ${
            collapsed ? 'opacity-0' : 'opacity-100'
          }`}
        />
   
        <Image
          src="/images/logo-small.svg"
          alt="Logo small"
          width={13.7}
          height={21.5}
          className={`absolute transition-all duration-300 ${
            collapsed ? 'opacity-100 translate-x-[5px]' : 'opacity-0 translate-x-[0px]'
          }`}
        />
      </div>

      <div className="h-full flex flex-col gap-[4px]">
        <SidebarButton
          iconSrc="/images/icon-nav-overview.svg"
          text="Overview"
          showText={!collapsed}
        />
        <SidebarButton
          iconSrc="/images/icon-nav-transactions.svg"
          text="Pots"
          showText={!collapsed}
        />
        <SidebarButton
          iconSrc="/images/icon-nav-budgets.svg"
          text="Recurring Bills"
          showText={!collapsed}
        />
        <SidebarButton
          iconSrc="/images/icon-nav-pots.svg"
          text="Transactions"
          showText={!collapsed}
        />
        <SidebarButton
          iconSrc="/images/icon-nav-recurring-bills.svg"
          text="Budgets"
          showText={!collapsed}
        />
      </div>

      <SidebarButton
        iconSrc="/images/icon-minimize-menu.svg"
        text="Minimize Menu"
        showText={!collapsed}
        onClick={() => setCollapsed(!collapsed)}
        imageClassName={collapsed ? 'rotate-180' : 'rotate-0'}
        extraMargin={'mb-300'}
      />

    </aside>
  );
}
