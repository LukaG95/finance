import Header from "@/components/layout/Header";
import AddBudgetButton from "@/components/budgets/AddBudgetButton";
import Card from "@/components/ui/Card";

export default function BudgetsLoading() {
  return (
    <div className="flex flex-col gap-400 pb-400">
      <Header>
        <h1 className="text-preset-1 text-grey-900">Budgets</h1>
        <div className="absolute right-0 bottom-0 flex gap-200 items-center h-full">
          <AddBudgetButton />
        </div>
      </Header>

      <div className="grid grid-cols-1 1350:grid-cols-[428px_1fr] gap-300">
        <Card className="flex flex-col sm:flex-row lg:!flex-col gap-500 sm:gap-200 lg:!gap-500 h-fit !p-250 sm:!p-400 sm:!pb-300 dark:bg-grey-200 animate-pulse">
          <div className="relative flex flex-col items-center justify-center h-[500px] pt-250 pb-250 sm:pb-[30px] w-full"></div>
        </Card>
        <div className="flex flex-col gap-300">
          <div className="w-full h-[400px] bg-white dark:bg-grey-200 animate-pulse rounded rounded-xl"></div>
          <div className="w-full h-[400px] bg-white dark:bg-grey-200 animate-pulse rounded-xl"></div>
          <div className="w-full h-[400px] bg-white dark:bg-grey-200 animate-pulse rounded-xl"></div>
        </div>
      </div>

    </div>
  );
}
