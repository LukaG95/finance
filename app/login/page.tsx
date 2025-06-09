import Link from 'next/link';
import { Form } from 'app/form';
import { signIn } from 'app/auth';
import { redirect } from 'next/navigation';
import { SubmitButton } from 'app/submit-button';

export default function Login() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border border-gray-100 shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b border-gray-200 bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold">Sign In</h3>
          <p className="text-sm text-gray-500">
            Use your email and password to sign in
          </p>
        </div>

        {/* Credentials Form */}
        <Form
          action={async (formData: FormData) => {
            'use server';
            let result: { error?: string } = {};
            try {
              result = await signIn('credentials', {
                redirect: false,
                email: formData.get('email') as string,
                password: formData.get('password') as string,
              });
            } catch (err) {
              result.error = 'error';
              console.log(err, 'login error');
            }

            if (!result?.error) {
              redirect('/');
            }
          }}
        >
          <SubmitButton>Sign in</SubmitButton>
        </Form>

        <form
          action={async () => {
            'use server';
            await signIn('google');
          }}
        >
          <button
            type="submit"
            className="mt-4 w-full rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
          >
            Sign in with Google
          </button>
        </form>

        {/* Link to Sign Up */}
        <p className="text-center text-sm text-gray-600 mt-4 mb-6">
          {"Don't have an account? "}
          <Link href="/register" className="font-semibold text-gray-800">
            Sign up
          </Link>
        
          {' for free.'}
        </p>
          <Link href="/recurring-bills" className="font-semibold text-gray-800">
            protected
          </Link>
      </div>
    </div>
  );
}
