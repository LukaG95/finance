import StatCards from "@/components/dashboard/StatCards";
import Header from "@/components/layout/Header";
import LogoutButton from "@/components/ui/LogoutButton";

export default function Dashboard() {
  return (
    <>
      <Header>
        <h1 className='text-preset-1 text-grey-900'>Overview</h1>
        <LogoutButton />
      </Header>
      <StatCards />
    </>
  );
}
