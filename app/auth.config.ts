import { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  providers: [
    // added later in auth.ts since it requires bcrypt which is only compatible with Node.js
    // while this file is also used in non-Node.js environments
  ],
  callbacks: {
    authorized({ auth, request }) {
      const nextUrl = request?.nextUrl;
      const pathname = nextUrl?.pathname ?? '';

      const isLoggedIn = !!auth?.user;
      const isOnDashboard = pathname.startsWith('/protected');

      if (isOnDashboard) {
        return isLoggedIn;
      }

      return true;
    } 

  },
} satisfies NextAuthConfig;