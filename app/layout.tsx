import "./styles/globals.css";
import "./styles/variables.css";
import { Toaster } from 'react-hot-toast';
import AuthToast from '@/components/ui/AuthToast';
import { Suspense } from 'react';
import Sidebar from "@/components/layout/Sidebar";
import DashboardLayout from "@/components/dashboard/DashboardLayout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className='h-full'>
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png"></link>
      </head>
      <body className='bg-beige-100 h-full'>
        <main className="flex flex-col-reverse justify-end lg:flex-row h-full">
          <Sidebar />
          <DashboardLayout>
            {children}
          </DashboardLayout>
        </main>
        <Toaster position="top-center" />
        <Suspense fallback={null}>
          <AuthToast />
        </Suspense>
      </body>
    </html>
  );
}
