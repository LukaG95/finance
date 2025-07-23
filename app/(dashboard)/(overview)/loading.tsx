import Card from "@/components/ui/Card";
import Header from "@/components/layout/Header";
import LogoutButton from "@/components/ui/LogoutButton";

export default async function OverviewLoading() {
  return (
    <div className="flex flex-col gap-400 py-300 lg:py-400">
     <Header>
        <h1 className='text-preset-1 text-grey-900'>Overview</h1>
        <LogoutButton />
      </Header>
      <Card className='h-[1000px] dark:bg-grey-200 animate-pulse' />
    </div>
  );
}
