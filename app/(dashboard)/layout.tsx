import Sidebar from "@/components/layout/Sidebar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex flex-col-reverse justify-end lg:flex-row h-full">
      <Sidebar />
      <div className="w-full">{children}</div>
    </main>
  );
}
