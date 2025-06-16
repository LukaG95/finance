'use client';

import { signOut } from 'next-auth/react';

export default function LogoutButton() {
  return (
    <button 
      className="
        absolute right-0 bottom-0 h-full 
        px-300 rounded-[8px] 
        bg-grey-900 text-white text-preset-3 
        cursor-pointer hover:bg-grey-500 
        transition-bg duration-150
      "
      onClick={() => signOut({ callbackUrl: '/login' })}
    >
      Logout
    </button>
  );
}
