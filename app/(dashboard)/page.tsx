import StatCards from "@/components/dashboard/StatCards";
import Header from "@/components/layout/Header";
import LogoutButton from "@/components/ui/LogoutButton";
import Card from "@/components/ui/Card";
import DonutChart from "@/components/budgets/DonutChart";
import { getCurrentUser } from '@/lib/data/getCurrentUser';
import { getTransactions } from '@/lib/data/getTransactions';
import { getBudgets } from '@/lib/data/getBudgets';
import { getBudgetSummaries, getTotalSpentAndLimit } from '@/lib/data/getBudgetStats';
import TransactionRows from "./transactions/TransactionRows";
import Link from "next/link";
import Image from "next/image";
import SpendingSummaryList from "./budgets/SpendingSummaryList";

export default async function Dashboard() {
      const user = await getCurrentUser();
      const budgets = await getBudgets(user._id);
      const transactions = await getTransactions(user._id);
    
      const budgetSummaries = getBudgetSummaries(budgets, transactions);
      const { totalSpent, totalLimit } = getTotalSpentAndLimit(budgetSummaries);

  return (
    <>
      <Header>
        <h1 className='text-preset-1 text-grey-900'>Overview</h1>
        <LogoutButton />
      </Header>
      <StatCards />
      <div className="grid grid-cols-1 md:grid-cols-[minmax(350px,3fr)_4fr] gap-300 items-start">
        <div className="flex flex-col gap-300">
          {/* Pots */}
          <Card className={`!min-h-[218px]`}>
            <div className="flex justify-between items-center">
              <h3 className="text-preset-2 text-grey-900">Pots</h3>
              <Link
                href="/pots"
                className="flex gap-200 text-preset-4 text-grey-500 items-center"
              >
                See Details
                <Image src="/images/icon-caret-right.svg" alt="icon" width={5} height={4} />
              </Link>
            </div>
          </Card>
          {/* Transactions */}
          <Card className="flex flex-col gap-400 px-250 py-300 sm:p-400">
            <div className="flex justify-between items-center">
              <h3 className="text-preset-2 text-grey-900">Transactions</h3>
              <Link
                href="/transactions"
                className="flex gap-200 text-preset-4 text-grey-500 items-center"
              >
                View All
                <Image src="/images/icon-caret-right.svg" alt="icon" width={5} height={4} />
              </Link>
            </div>
            <TransactionRows transactions={transactions.slice(0, 5)} onOverviewPage={true}/>
          </Card>
        </div>
        <div className="flex flex-col gap-300">
          {/* Budgets */}
          <Card className="flex flex-col gap-100 sm:gap-400 px-250 py-300 sm:p-400">
            <div className="flex justify-between items-center">
              <h3 className="text-preset-2 text-grey-900">Budgets</h3>
              <Link
                href="/budgets"
                className="flex gap-200 text-preset-4 text-grey-500 items-center"
              >
                See Details
                <Image src="/images/icon-caret-right.svg" alt="icon" width={5} height={4} />
              </Link>
            </div>
            <div className="flex flex-col 1350:flex-row">
              <DonutChart budgets={budgetSummaries} totalLimit={totalLimit} totalSpent={totalSpent} onOverviewPage={true}/>
              <SpendingSummaryList budgets={budgetSummaries.slice(0, 4)} onOverviewPage={true} />
            </div>
          </Card>

            {/* Recurring Bills */}
          <Card>
            <div className="flex justify-between items-center">
              <h3 className="text-preset-2 text-grey-900">Recurring Bills</h3>
              <Link
                href="/recurring-bills"
                className="flex gap-200 text-preset-4 text-grey-500 items-center"
              >
                See Details
                <Image src="/images/icon-caret-right.svg" alt="icon" width={5} height={4} />
              </Link>
            </div>
          </Card>
        </div>
      </div>

    </>
  );
}
