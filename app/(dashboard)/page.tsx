import Header from "@/components/layout/Header";
import LogoutButton from "@/components/ui/LogoutButton";
import OverviewContent from "@/components/overview/OverviewContent";
import { Suspense } from "react";
import OverviewSkeleton from "@/components/overview/OverviewSkeleton";

export default async function Dashboard() {

  return (
    <div className="flex flex-col gap-400 pb-400">
      <Header>
        <h1 className='text-preset-1 text-grey-900'>Overview</h1>
        <LogoutButton />
      </Header>

      <Suspense fallback={<OverviewSkeleton />}>
        <OverviewContent />
      </Suspense>
    </div>
  );
}
