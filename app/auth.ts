import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { compare } from 'bcrypt-ts';
import { getUser } from 'lib/mongodb';
import { authConfig } from 'app/auth.config';
import { MongoDBAdapter } from "@auth/mongodb-adapter"
import clientPromise from "@/lib/mongodb"

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  adapter: MongoDBAdapter(clientPromise),
  providers: [
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