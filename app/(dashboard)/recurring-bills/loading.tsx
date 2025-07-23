import Header from "@/components/layout/Header";
import Card from "@/components/ui/Card";

export default function BillsLoading() {
  return (
    <div className="flex flex-col gap-400 pb-400">
      <Header>
        <h1 className="text-preset-1 text-grey-900">Recurring Bills</h1>
      </Header>
      <div className="grid grid-cols-1 1350:grid-cols-[337px_1fr] gap-300">
        <div className="flex flex-col md:flex-row lg:!flex-col gap-300">
          <Card className="h-[190px] dark:bg-grey-200 animate-pulse"></Card>
          <Card className="h-[204px] dark:bg-grey-200 animate-pulse"></Card>
        </div>
        <Card className="h-[742px] dark:bg-grey-200 animate-pulse"></Card>
      </div>
    </div>
  );
}
