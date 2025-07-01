export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='flex justify-center h-full w-full px-500 py-400 overflow-scroll'>
      <div className='flex flex-col gap-400 w-full max-w-[1200px]'>
        {children}
      </div>
    </main>
  );
}
