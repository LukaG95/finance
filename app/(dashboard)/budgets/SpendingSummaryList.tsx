import { BudgetSummary } from "types/budget";
import { THEME_CLASSES } from '@/lib/constants';

interface Props {
  budgets: BudgetSummary[];
}

export default function SpendingSummaryList({ budgets }: Props) {
  return (
    <>
      <h2 className="text-preset-2 text-grey-900 mb-300">Spending Summary</h2>
      <ul className="flex flex-col divide-y divide-grey-100">
        {budgets.map(budget => {
          const {spent} = budget;
          const themeColorClass = THEME_CLASSES[budget.theme] || 'bg-grey-300';
          
          return (
            <li key={budget._id} className="flex items-center justify-between py-200 first:pt-0 last:pb-0">
              <div className="flex items-center gap-200">
                <span className={`h-[21px] w-[4px] rounded-full ${themeColorClass}`} />
                <span className="text-preset-4 text-grey-500">{budget.category}</span>
              </div>
              <div className="text-preset-4-bold text-right">
                <span className="text-preset-3 text-grey-900 mr-100">${spent.toFixed(2)}</span>
                <span className="text-preset-5 text-grey-500"> of ${budget.amount.toFixed(2)}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
