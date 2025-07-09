'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import DropdownButton from '../ui/DropdownButton';

const SORT_OPTIONS = ['Latest', 'Oldest', 'A to Z', 'Z to A', 'Highest', 'Lowest'];
const CATEGORY_OPTIONS = [
  'All Transactions', 'General', 'Dining Out', 'Groceries', 'Entertainment', 'Transportation',
  'Lifestyle', 'Personal Care', 'Education', 'Bills', 'Shopping'
];

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [sortValue, setSortValue] = useState(searchParams.get('sort') || 'Latest');
  const [categoryValue, setCategoryValue] = useState(searchParams.get('category') || CATEGORY_OPTIONS[0]);

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value.trim() === '') {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    // Always reset to page 1 when a filter changes
    if (key !== 'page') {
      params.set('page', '1');
    }

    router.replace(`?${params.toString()}`, {scroll: false});

    // Disable automatic scroll and scroll manually, because of DashboardLayout padding issue
    const container = document.getElementById('dashboard-scroll-container');
    container?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex justify-between">
      {/* Search Input */}
      <div className="relative sm:max-w-[320px] w-full mb-50 lg:mb-0">
        <input
          className="border border-beige-500 rounded-[8px] w-full pl-250 pr-500 py-[11px] text-preset-4 truncate overflow-hidden whitespace-nowrap"
          placeholder="Search transaction"
          defaultValue={searchParams.get('query') || ''}
          onChange={e => {updateParam('query', e.target.value)}}
        />
        <Image
          src="/images/icon-search.svg"
          alt="Search"
          width={14}
          height={14}
          className="absolute right-250 top-1/2 transform -translate-y-1/2"
        />
      </div>

      {/* Sort and Category Buttons */}
      <div className="flex md:gap-300">
        <DropdownButton
          label="Sort by"
          options={SORT_OPTIONS}
          value={sortValue}
          iconSrc='/images/icon-sort-mobile.svg'
          buttonWidth="w-full md:w-[122px]"
          wrapperClassName='ml-150 md:ml-300'
          onChange={(val) => {
            setSortValue(val);
            updateParam('sort', val);
          }}
        />
        <DropdownButton
          label="Category"
          options={CATEGORY_OPTIONS}
          value={categoryValue}
          iconSrc='/images/icon-filter-mobile.svg'
          buttonWidth="w-full md:w-[177px]"
          onChange={(val) => {
            setCategoryValue(val);
            updateParam('category', val);
          }}
        />
      </div>
    </div>
  );
}
