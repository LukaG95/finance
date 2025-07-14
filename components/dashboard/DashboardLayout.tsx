export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main
      id="dashboard-scroll-container"
      className="flex justify-center h-full w-full px-200 md:px-500 overflow-scroll"
    >
      <div className="flex flex-col gap-400 w-full max-w-[1440px] py-300 lg:py-400">
        {children}
      </div>
    </main>
  );
}
