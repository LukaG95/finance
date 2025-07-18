import { BudgetSummary } from "types/budget";
import { THEME_CLASSES } from '@/lib/constants';

interface Props {
  budgets: BudgetSummary[];
  onOverviewPage?: boolean;
}

export default function SpendingSummaryList({ budgets, onOverviewPage }: Props) {
  return (
    <section className={
      `min-w-[280px] py-0 sm:py-250 lg:!py-0 items-center
      ${onOverviewPage && 'flex justify-center 1350:justify-end min-w-auto'} 
      `
    }>
      <h2 className={`${onOverviewPage && 'hidden'} text-preset-2 text-grey-900 mb-300`}>Spending Summary</h2>
      <ul className={
        `flex flex-col divide-grey-100 items-start divide-y w-full
        ${onOverviewPage && 'grid grid-cols-2 gap-y-200 gap-x-500 1350:gap-0 1350:flex w-fit divide-none'} 
        `
      }>
        {budgets.map(budget => {
          const {spent} = budget;
          const themeColorClass = THEME_CLASSES[budget.theme] || 'bg-grey-300';
          
          return (
            <li key={budget._id} className={`flex gap-200 items-center w-fit ${onOverviewPage ? 'py-0 1350:py-100' : 'py-200'} first:pt-0 last:pb-0 w-full`}>
              <span className={`${onOverviewPage ? 'h-[43px]' : 'h-[21px]'} min-w-[4px] rounded-full ${themeColorClass}`} />
              <div className={`flex ${onOverviewPage && 'flex-col'} justify-between items-center w-full items-start`}>
                <span className={`${onOverviewPage ? 'text-preset-5' : 'text-preset-4'} text-grey-500`}>{budget.category}</span>
         
                <div>
                  <span className={`${!onOverviewPage && 'hidden'} text-preset-4-bold`}>${budget.amount.toFixed(2)}</span>
                  <span className={`${onOverviewPage && 'hidden'} text-preset-3 text-grey-900 mr-100`}>${spent.toFixed(2)}</span>
                  <span className={`${onOverviewPage && 'hidden'} text-preset-5 text-grey-500`}> of ${budget.amount.toFixed(2)}</span>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
