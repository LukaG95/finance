'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

const SORT_OPTIONS = ['Latest', 'Oldest', 'A to Z', 'Z to A', 'Highest', 'Lowest'];
const CATEGORY_OPTIONS = [
  'All Transactions', 'General', 'Dining Out', 'Groceries', 'Entertainment', 'Transportation',
  'Lifestyle', 'Personal Care', 'Education', 'Bills', 'Shopping'
];

export default function FilterBar() {
  const [sortOpen, setSortOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);

  const sortRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  const [sortValue, setSortValue] = useState(searchParams.get('sort') || 'Latest');
  const [categoryValue, setCategoryValue] = useState(searchParams.get('category') || CATEGORY_OPTIONS[0]);

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    router.replace(`?${params.toString()}`);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      if (sortRef.current && !sortRef.current.contains(target)) setSortOpen(false);
      if (categoryRef.current && !categoryRef.current.contains(target)) setCategoryOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex justify-between">
      {/* Search Input */}
      <div className="relative w-[320px]">
        <input
          className="border border-beige-500 rounded-[8px] w-full px-250 py-150 text-preset-4"
          placeholder="Search transaction"
        />
        <Image
          src="/images/icon-search.svg"
          alt="Search"
          width={16}
          height={16}
          className="absolute right-250 top-1/2 transform -translate-y-1/2"
        />
      </div>

      {/* Sort and Category Buttons */}
      <div className="flex gap-300">
        {/* Sort Dropdown */}
        <div className="flex items-center gap-100 relative" ref={sortRef}>
          <label className="text-preset-4 text-grey-500">Sort by</label>
          <div className="relative w-max">
            <button
              onClick={() => {
                setSortOpen(prev => !prev);
                setCategoryOpen(false);
              }}
              className="flex justify-between w-[120px] gap-200 px-250 py-150 border border-beige-500 rounded-[8px] text-preset-4 cursor-pointer hover:bg-grey-100 active:bg-grey-300 transition-bg duration-200"
            >
              {sortValue}
              <Image
                src="/images/icon-caret-down.svg"
                alt="sort"
                width={11}
                height={6}
                className={`transition-transform duration-200 group-hover:brightness-300 ${sortOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <div className={`absolute w-full top-full left-0 mt-100 bg-white rounded-[8px] shadow-[0px_4px_24px_rgba(0,0,0,0.25)] max-h-[300px] overflow-scroll transition-all duration-200 origin-top transform ${sortOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}>
              <ul className="text-preset-4">
                {SORT_OPTIONS.map(option => (
                  <li
                    key={option}
                    onClick={() => {
                      setSortValue(option);
                      updateParam('sort', option);
                      setSortOpen(false);
                    }}
                    className={`px-250 py-150 cursor-pointer hover:bg-grey-100 ${sortValue === option ? 'font-bold text-grey-900' : ''}`}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Category Dropdown */}
        <div className="flex items-center gap-100 relative" ref={categoryRef}>
          <label className="text-preset-4 text-grey-500">Category</label>
          <div className="relative w-max">
            <button
              onClick={() => {
                setCategoryOpen(prev => !prev);
                setSortOpen(false);
              }}
              className="flex w-[177px] gap-200 justify-between px-250 py-150 border border-beige-500 rounded-[8px] text-preset-4 cursor-pointer hover:bg-grey-100 active:bg-grey-300 transition-bg duration-200"
            >
              {categoryValue}
              <Image
                src="/images/icon-caret-down.svg"
                alt="category"
                width={11}
                height={6}
                className={`transition-transform duration-200 group-hover:brightness-300 ${categoryOpen ? 'rotate-180' : ''}`}
              />
            </button>
            <div className={`absolute w-full top-full left-0 mt-100 bg-white rounded-[8px] shadow-[0px_4px_24px_rgba(0,0,0,0.25)] max-h-[300px] overflow-scroll transition-all duration-200 origin-top transform ${categoryOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'}`}>
              <ul className="text-preset-4">
                {CATEGORY_OPTIONS.map(option => (
                  <li
                    key={option}
                    onClick={() => {
                      setCategoryValue(option);
                      updateParam('category', option);
                      setCategoryOpen(false);
                    }}
                    className={`px-250 py-150 cursor-pointer hover:bg-grey-100 ${categoryValue === option ? 'font-bold text-grey-900' : ''}`}
                  >
                    {option}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
