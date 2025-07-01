import { auth } from '@/lib/auth';
import client from '@/lib/mongodb';
import { redirect } from 'next/navigation';
import TransactionTable from './TransactionTable';

// TransactionTableWrapper.tsx
export default async function TransactionTableWrapper({ searchParams }: { searchParams: { page?: string } }) {
  const session = await auth();
  if (!session?.user?.email) redirect('/login');

  const db = client.db();
  const user = await db.collection('users').findOne({ email: session.user.email });
  if (!user?._id) redirect('/login');

  const page = parseInt(searchParams.page || '1') || 1;
  const perPage = 10;
  const skip = (page - 1) * perPage;

  const rawTransactions = await db
    .collection('transactions')
    .find({
      $or: [{ sender_id: user._id }, { receiver_id: user._id }],
    })
    .sort({ date: -1 })
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

  const total = await db.collection('transactions').countDocuments({
    $or: [{ sender_id: user._id }, { receiver_id: user._id }],
  });

  return (
    <TransactionTable
      transactions={transactions}
      total={total}
      currentPage={page}
      perPage={perPage}
    />
  );
}
