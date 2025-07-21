import "./styles/globals.css";
import "./styles/variables.css";
import { Toaster } from 'react-hot-toast';
import AuthToast from '@/components/ui/AuthToast';

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
        {children}
        <Toaster position="top-center" />
        <AuthToast />
      </body>
    </html>
  );
}
