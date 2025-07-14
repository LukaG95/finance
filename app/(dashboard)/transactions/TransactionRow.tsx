import ImageFallback from '../../../components/ui/ImageFallback';

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

  return (
    <div
      className={`grid sm:grid-cols-[3fr_1fr_1fr_80px] grid-cols-2 gap-y-2 items-center border-b border-grey-100 py-300 lg:px-200 ${
        isFirst ? 'pt-0' : ''
      } ${isLast ? 'pb-0 border-b-0' : ''}`}
    >
      {/* Sender + Category */}
      <div className="flex items-center gap-2 col-span-1">
        <ImageFallback 
          src={`/images/avatars/${imageName}.jpg`} 
          fallbackSrc={'/images/avatars/default.png'}
          alt={tx.sender}
          width={40}
          height={40}
          className="rounded-full object-cover w-[32px] h-[32px] sm:w-[40px] sm:h-[40px]"
        />

        <div className="flex flex-col gap-50">
          <span className="text-preset-4-bold text-grey-900 whitespace-nowrap">{tx.sender}</span>
          <span className="text-grey-500 text-preset-5 sm:hidden">{tx.category}</span>
        </div>
      </div>

      <span className="text-grey-500 text-preset-5 hidden sm:block">{tx.category}</span>
      <span className="text-grey-500 text-preset-5 hidden sm:block">{tx.date}</span>
      
      <div className="flex flex-col items-end col-span-1 gap-50">
        <span
          className={`text-preset-4-bold ${
            tx.amount >= 0 ? 'text-green' : 'text-grey-900'
          }`}
        >
          {tx.amount >= 0 ? '+' : '-'}${Math.abs(tx.amount).toFixed(2)}
        </span>
        <span className="text-grey-500 text-preset-5 sm:hidden">{tx.date}</span>
      </div>
    </div>
  );
}
