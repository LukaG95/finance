'use client';

import Image from 'next/image';
import { useState } from 'react';

type Props = {
  tx: {
    _id: string;
    sender: string;
    category: string;
    date: string;
    amount: number;
  };
  isFirst?: boolean;
  isLast?: boolean;
};

export default function TransactionRow({ tx, isFirst, isLast }: Props) {
  const imageName = tx.sender.toLowerCase().replace(/\s+/g, '-');
  const fallbackImage = '/images/avatars/default.png';
  const [imgSrc, setImgSrc] = useState(`/images/avatars/${imageName}.jpg`);

  return (
    <div
      className={`grid grid-cols-[4fr_170px_120px_200px] items-center border-b border-grey-100 py-300 px-200 ${
        isFirst ? 'pt-0' : ''
      } ${isLast ? 'pb-0 border-b-0' : ''}`}
    >
      <span className="flex text-preset-4-bold items-center gap-2 text-grey-900 ">
        <Image
          src={imgSrc}
          alt={tx.sender}
          width={40}
          height={40}
          className="rounded-full object-cover"
          onError={() => setImgSrc(fallbackImage)}
        />
        {tx.sender}
      </span>
      <span className="text-grey-500 text-preset-5 ">{tx.category}</span>
      <span className="text-grey-500 text-preset-5 ">{tx.date}</span>
      <span
        className={`text-right text-preset-4-bold  ${
          tx.amount >= 0 ? 'text-green' : 'text-grey-900'
        }`}
      >
        {tx.amount >= 0 ? '+' : '-'}${Math.abs(tx.amount).toFixed(2)}
      </span>
    </div>
  );
}
