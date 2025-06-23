import Link from 'next/link';
import { Form } from '@/components/ui/Form';
import { signIn } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { SubmitButton } from '@/components/ui/SubmitButton';
import { GuestLoginButton } from '@/components/ui/GuestLoginButton';

export default function LoginPage() {
  async function login(formData: FormData) {
    'use server';
    let result: { error?: string } = {};

    try {
      result = await signIn('credentials', {
        redirect: false,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
      });
    } catch (err) {
      console.error('Login error:', err);
      result.error = 'Login error';
    }

    if (!result?.error) {
      redirect('/');
    }

    return result?.error || 'Unknown error';
  }

  return (
    <section className="flex flex-col">
      <h1 className="text-preset-1 text-grey-900 pb-400">Login</h1>

      <Form action={login}>
        <SubmitButton className="mb-100">Login</SubmitButton>
      </Form>

      <form
        action={async () => {
          'use server';
          await signIn('google', { callbackUrl: '/' });
        }}
      >

        <SubmitButton className="mb-100">Login with google</SubmitButton>
      </form>

      <GuestLoginButton />

      <p className="text-sm text-center mt-400 text-gray-600">
        Need to create an account?{' '}
        <Link href="/register" className="font-semibold text-gray-800 underline">
          Sign Up
        </Link>
      </p>
    </section>
  );
}
