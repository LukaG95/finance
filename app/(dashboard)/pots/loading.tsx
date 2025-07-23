import Header from '@/components/layout/Header';
import AddPotButton from '@/components/pots/AddPotButton';
import Card from '@/components/ui/Card';

export default async function PotsLoading() {

  return (
    <div className="flex flex-col gap-400 pb-400">
      <Header>
        <h1 className="text-preset-1 text-grey-900">Pots</h1>
        <div className="absolute right-0 bottom-0 flex gap-200 items-center h-full">
          <AddPotButton />
        </div>
      </Header>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-300">
        <Card className="relative flex flex-col h-[303px] dark:bg-grey-200 animate-pulse" />
        <Card className="relative flex flex-col h-[303px] dark:bg-grey-200 animate-pulse" />
        <Card className="relative flex flex-col h-[303px] dark:bg-grey-200 animate-pulse" />
        <Card className="relative flex flex-col h-[303px] dark:bg-grey-200 animate-pulse" />
        <Card className="relative flex flex-col h-[303px] dark:bg-grey-200 animate-pulse" />
        <Card className="relative flex flex-col h-[303px] dark:bg-grey-200 animate-pulse" />
      </div>
    </div>
  );
}
