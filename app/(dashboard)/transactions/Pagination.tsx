'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Pagination({ totalPages, currentPage }: { totalPages: number; currentPage: number }) {
  const router = useRouter();

  const goToPage = (page: number) => {
    router.push(`?page=${page}`);
  };


  return (
    <div className="flex items-center justify-between mt-400 text-preset-4">
      <button 
        onClick={() => goToPage(currentPage - 1)} 
        disabled={currentPage === 1}
        className="flex group items-center gap-200 px-200 rounded-[8px] h-500 border border-beige-500 cursor-pointer hover:bg-grey-500 hover:text-white transition duration-150"
      >
        <Image
          src="/images/icon-caret-left.svg"
          alt="logout"
          width={6}
          height={6}
          className="transition duration-150 group-hover:brightness-300"
        />
        Prev
      </button>
      <div className="flex gap-100">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i + 1)}
            className={`h-500 w-500 rounded-[8px] cursor-pointer transition duration-150 ${i + 1 === currentPage ? 'bg-grey-900 text-white' : 'border border-beige-500 hover:bg-grey-500 hover:text-white'}`}
          >
            {i + 1}
          </button>
        ))} 
      </div>
      <button 
        onClick={() => goToPage(currentPage + 1)} 
        disabled={currentPage === totalPages}
        className="group flex items-center gap-200 px-200 rounded-[8px] h-500 border border-beige-500 cursor-pointer hover:bg-grey-500 hover:text-white transition duration-150"
      >
        Next
        <Image
          src="/images/icon-caret-right.svg"
          alt="arrow"
          width={6}
          height={6}
          className="transition duration-150 group-hover:brightness-300"
        />
      </button>

    </div>
  );
}
