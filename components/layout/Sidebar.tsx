'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`h-[100%] bg-grey-900 rounded-r-[16px] transition-all duration-300 ${
        collapsed ? 'w-[88px]' : 'w-[300px]'
      }`}
    >
      <div className="relative px-400 py-500 mb-300">
        {/* Large logo */}
        <Image
          src="/images/logo-large.svg"
          alt="Logo large"
          width={121}
          height={21.5}
          className={`absolute transition-opacity duration-300 ${
            collapsed ? 'opacity-0' : 'opacity-100'
          }`}
        />
        {/* Small logo */}
        <Image
          src="/images/logo-small.svg"
          alt="Logo small"
          width={13.7}
          height={21.5}
          className={`absolute transition-opacity duration-300 translate-x-[-1px] ${
            collapsed ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      <div className="flex justify-center mb-300">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="bg-grey-700 text-white px-400 py-200 rounded"
        >
          {collapsed ? 'Expand' : 'Collapse'}
        </button>
      </div>
    </aside>
  );
}
