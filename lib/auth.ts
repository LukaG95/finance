import NextAuth from 'next-auth';
import Google from "next-auth/providers/google"
import Credentials from 'next-auth/providers/credentials';
import { compare } from 'bcrypt-ts';
import { getUser } from 'lib/mongodb';
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import client from '@/lib/mongodb';

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: MongoDBAdapter(client),
  debug: true,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    Credentials({
      async authorize({ email, password }: any) {
        const user = await getUser(email);
        if (!user || !user.password) return null;
        
        const passwordsMatch = await compare(password, user.password);
        if (!passwordsMatch) return null;
        
        return user;
      },
    }),
  ],
});


