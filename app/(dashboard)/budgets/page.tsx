import { Suspense } from 'react';
import Header from '@/components/layout/Header';
import Loading from '@/components/ui/Loading';
import AddBudgetModal from '@/components/budgets/AddBudgetModal';

export default async function BudgetsPage({ searchParams }: any ) {
  return (
    <div className='flex flex-col gap-400 pb-400'>
      <Header>
        <h1 className='text-preset-1 text-grey-900'>Budgets</h1>
        <div className="absolute right-0 bottom-0 flex gap-200 items-center h-full">
          <AddBudgetModal />
        </div>
      </Header>
    </div>
  );
}