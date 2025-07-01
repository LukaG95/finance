import TransactionRow from '@/components/transactions/TransactionRow';
import Pagination from './Pagination';
import Card from '@/components/ui/Card';
import Image from 'next/image';
import FilterBar from '@/components/transactions/FilterBar';

type Transaction = {
  _id: string;
  sender: string;
  category: string;
  date: string;
  amount: number;
};

interface Props {
  transactions: Transaction[];
  total: number;
  currentPage: number;
  perPage?: number;
}

export default function TransactionTable({ transactions, total, currentPage, perPage = 10 }: Props) {
  const totalPages = Math.ceil(total / perPage);
  return (
    <Card className='flex flex-col p-400 gap-300'>
      <FilterBar />

      {/* Headers */}
      <div className="grid grid-cols-[4fr_170px_120px_200px] text-grey-500 text-preset-5 border-b border-grey-100 py-150 px-200">
        <span>Recipient / Sender</span>
        <span>Category</span>
        <span>Transaction Date</span>
        <span className="text-right">Amount</span>
      </div>
 
      {/* Rows */}
      <div>
        {transactions.length > 0 ? (
          transactions.map((tx, i) => (
            <TransactionRow
                key={tx._id}
                tx={tx}
                isFirst={i === 0}
                isLast={i === transactions.length - 1}
              />
          ))
        ) : (
          <p className="text-grey-500 text-sm mt-4">No transactions found.</p>
        )}
      </div>

      {/* Pagination */}
      <div>
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </div>
    </Card>
  );
}
