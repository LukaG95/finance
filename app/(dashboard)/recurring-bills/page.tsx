import { getCurrentUser } from '@/lib/data/getCurrentUser';

export default async function RecurringBills() {
  const user = await getCurrentUser();

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