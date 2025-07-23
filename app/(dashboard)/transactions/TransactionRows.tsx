import TransactionRow from "./TransactionRow";

type Transaction = {
  _id: string;
  sender: string;
  category: string;
  date: string;
  amount: number;
};

interface Props {
  transactions: Transaction[];
  onOverviewPage?: boolean;
}

export default function TransactionRows({ transactions, onOverviewPage }: Props) {
  return (
      <ul>
        {transactions.length > 0 ? (
          transactions.map((tx, i) => (
            <TransactionRow
                key={tx._id}
                tx={tx}
                isFirst={i === 0}
                isLast={i === transactions.length - 1}
                onOverviewPage={onOverviewPage}
              />
          ))
        ) : (
          <p className="text-grey-500 text-sm mt-4">No transactions found.</p>
        )}
      </ul>
  );
}
