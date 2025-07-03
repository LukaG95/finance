export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className='flex justify-center h-full w-full py-300 px-200 md:px-500 lg:py-400 overflow-scroll scroll-smooth'>
      <div className='flex flex-col gap-400 w-full max-w-[1200px]'>
        {children}
      </div>
    </main>
  );
}
