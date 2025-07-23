import { Suspense } from 'react';
import Header from '@/components/layout/Header';
import Loading from '@/components/ui/Loading';
import AddTransactionModal from '@/components/transactions/AddTransactionModal';
import { auth } from '@/lib/auth';
import client from '@/lib/mongodb';
import { redirect } from 'next/navigation';
import { getSortOption } from '@/lib/utils';
import TransactionTable from './TransactionTable';

export default async function TransactionsPage({ searchParams }: { searchParams: any }) {
  const session = await auth();
  if (!session?.user?.email) redirect('/login');

  const db = client.db();
  const user = await db.collection('users').findOne({ email: session.user.email });
  if (!user?._id) redirect('/login');

  const resolvedParams = await searchParams;

  const selectedCategory = resolvedParams.category || 'All Transactions';
  const page = parseInt(resolvedParams.page || '1') || 1;
  const sort = resolvedParams.sort;
  const perPage = 10;
  const skip = (page - 1) * perPage;
  const sortQuery = getSortOption(sort);

  const filter: any = {
    $or: [{ sender_id: user._id }, { receiver_id: user._id }],
  };
  const query = resolvedParams.query?.toLowerCase();

  if (selectedCategory !== 'All Transactions') filter.category = selectedCategory;
  if (query) {
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    filter.sender = { $regex: escapedQuery, $options: 'i' };
  }

  const rawTransactions = await db
    .collection('transactions')
    .find(filter)
    .sort(sortQuery)
    .skip(skip)
    .limit(perPage)
    .toArray();

  const transactions = rawTransactions.map(tx => ({
    _id: tx._id.toString(),
    sender: tx.sender || 'Unknown',
    category: tx.category || 'Uncategorized',
    date: new Date(tx.date).toLocaleDateString(),
    amount: tx.amount ?? 0,
  }));

  const total = await db.collection('transactions').countDocuments(filter);
  const totalPages = Math.ceil(total / perPage);

  return (
    <div className='flex flex-col gap-400 pb-400'>
      <Header>
        <h1 className='text-preset-1 text-grey-900'>Transactions</h1>
        <div className="absolute right-0 bottom-0 flex gap-200 items-center h-full">
          <AddTransactionModal />
        </div>
      </Header>

      <Suspense fallback={<Loading />}>
        <TransactionTable
          transactions={transactions}
          currentPage={page}
          totalPages={totalPages}
        />
      </Suspense>
    </div>
  );
}
