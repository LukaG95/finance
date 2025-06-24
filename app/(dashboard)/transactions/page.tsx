import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function Transactions() {
  const session = await auth();

  console.log("session", session)
   if (!session?.user) {
    redirect('/login');
  }

  return (
    <div>
      Transactions page
    </div>
  );
}
