import { Suspense } from 'react';
import Header from '@/components/layout/Header';
import TransactionTableWrapper from './TransactionTableWrapper';
import Loading from './loading';
import AddTransactionModal from '@/components/transactions/AddTransactionModal';

export default function TransactionsPage({ searchParams }: { searchParams: { page?: string } }) {
  return (
    <div className='flex flex-col gap-400 pb-400'>
      <Header>
        <h1 className='text-preset-1 text-grey-900'>Transactions</h1>
        <div className="absolute right-0 bottom-0 flex gap-200 items-center h-full">
          <AddTransactionModal />
        </div>
      </Header>

      <Suspense fallback={<Loading />}>
        <TransactionTableWrapper searchParams={searchParams}/>
      </Suspense>
    </div>
  );
}
