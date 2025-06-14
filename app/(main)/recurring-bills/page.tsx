/* import { auth, signOut } from '@/lib/auth';
import { redirect } from 'next/navigation'; */

export default async function RecurringBills() {
  /* const session = await auth();

   if (!session?.user) {
    redirect('/login');
  } */

  return (
    <div>
      Recurring bills page
    </div>
  );
}
/* 
function SignOut() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <button type="submit">Sign out</button>
    </form>
  );
} */