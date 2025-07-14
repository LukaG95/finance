import TransactionRow from '@/app/(dashboard)/transactions/TransactionRow';
import Pagination from '../../../components/transactions/Pagination';
import Card from '@/components/ui/Card';
import TransactionsFilterBar from '@/components/transactions/TransactionsFilterBar';

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
    <Card className='flex flex-col px-250 py-300 md:p-400 gap-300'>
      <TransactionsFilterBar />

      {/* Headers */}
      <div className="grid-cols-[3fr_1fr_1fr_80px] text-grey-500 text-preset-5 border-b border-grey-100 py-150 lg:px-200 whitespace-nowrap hidden lg:grid">
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
