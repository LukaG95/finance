import { BudgetSummary } from "types/budget";
import Card from '@/components/ui/Card';
import { getTransactions } from "@/lib/data/getTransactions";
import { THEME_CLASSES } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import ImageFallback from "@/components/ui/ImageFallback";
import DropdownButton from "@/components/ui/DropdownButton";

interface Props {
  budget: BudgetSummary;
  userId: any;
}

export default async function BudgetCard({
  budget,
  userId
}: Props) {
  const { _id, category, theme, amount, spent } = budget;
  const remaining = Math.max(amount - spent, 0);
  const percentage = Math.min((spent / amount) * 100, 100);

  const recentTransactions = await getTransactions(userId, category, 3);
  const themeColorClass = THEME_CLASSES[theme] || 'bg-grey-300';

  return (
    <Card className='relative flex flex-col justify-between gap-250 !p-250 sm:!p-400'>
      {/* Header */}
      <div className="flex items-center gap-200">
        <span className={`h-[16px] w-[16px] rounded-full ${themeColorClass}`} />
        <h2 className="text-preset-2 text-grey-900">{category}</h2>
        <DropdownButton
          options={['Edit Budget', 'Delete Budget']}
          iconSrc='/images/icon-ellipsis.svg'
          buttonWidth="w-full"
          wrapperClassName='!absolute right-150 sm:right-250'
          variant='ellipsis'
          budget={{ budgetId: _id, category, theme, amount }}
        />
      </div>

      <div className='flex flex-col justtify-between gap-200'>
        <p className="text-preset-4 text-grey-500">Maximum of ${amount.toFixed(2)}</p>

        {/* Progress Bar */}
        <div className="bg-beige-100 rounded-[4px] h-[32px] p-50 w-full overflow-hidden">
          <div
            className={`h-full rounded-[4px] ${themeColorClass}`}
            style={{ width: `${percentage}%`}}
          />
        </div>

        {/* Spent vs Remaining */}
        <div className="flex text-preset-4 text-grey-900">
          <div className='flex flex-col gap-50 relative pl-250'>
            <span className={`absolute left-0 h-full w-[4px] rounded-full ${themeColorClass}`}></span>
            <div className="text-grey-500 text-preset-5">Spent</div>
            <div className='text-preset-4-bold'>${spent.toFixed(2)}</div>
          </div>
          <div className='flex flex-col gap-50 m-auto relative pl-250'>
            <span className={`absolute left-0 h-full w-[4px] rounded-full bg-beige-100`}></span>
            <div className="text-grey-500 text-preset-5">Remaining</div>
            <div className='text-preset-4-bold'>${remaining.toFixed(2)}</div>
          </div>
        </div>
      </div>

      {/* Latest Spending */}
      <div className="bg-beige-100 rounded-xl p-250 pb-100">
        <div className="flex justify-between items-center mb-100">
          <h3 className="text-preset-3 text-grey-900">Latest Spending</h3>
          <Link
            href={{
              pathname: '/transactions',
              query: { category }
            }}
            className="flex gap-200 text-preset-4 text-grey-500 cursor-pointer items-center"
          >
            See All
            <Image
              src="/images/icon-caret-right.svg"
              alt="icon"
              width={5}
              height={4}
            />
          </Link>
        </div>

        <ul className="flex flex-col divide-y divide-grey-500/15">
          {recentTransactions.map((tx, i) => { 
            const imageName = tx.sender.toLowerCase().replace(/\s+/g, '-');
              return (
                <li key={i} className="flex justify-between items-center py-150">
                  <div className="flex items-center gap-200">
                    <ImageFallback 
                      src={`/images/avatars/${imageName}.jpg`} 
                      fallbackSrc={'/images/avatars/default.png'}
                      alt={tx.sender}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                    <div className="text-grey-900 text-preset-5-bold">{tx.sender}</div>
                  </div>
                  <div className='flex flex-col items-end gap-50'>
                    <div className="text-grey-900 text-preset-5-bold">-${Math.abs(tx.amount).toFixed(2)}</div>
                    <span className="text-grey-500 text-preset-5">{new Date(tx.date).toLocaleDateString()}</span>
                  </div>
                </li>
              )
          })}
        </ul>
      </div>
    </Card>
  );
}
