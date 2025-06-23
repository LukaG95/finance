import Link from 'next/link';
import { Form } from '@/components/ui/Form';
import { createUser, getUser } from '@/lib/mongodb';
import { SubmitButton } from '@/components/ui/SubmitButton';

export default function RegisterPage() {
  async function register(formData: FormData) {
    'use server';
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const user = await getUser(email);
    if (!user) {
      await createUser(email, password, name); 
    } else {
      return 'User already exists';
    }
  }

  return (
    <section>
      <h1 className="text-preset-1 text-grey-900 pb-400">Sign Up</h1>

      <Form action={register} showNameField>
        <SubmitButton>Sign Up</SubmitButton>
      </Form>

      <p className="text-sm text-center mt-400 text-gray-600">
        Already have an account?{' '}
        <Link href="/login" className="font-semibold text-gray-800 underline">
          Sign in
        </Link>
      </p>
    </section>
  );
}
