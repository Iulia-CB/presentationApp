import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';

export const { handlers, signIn, signOut, auth } = NextAuth({
   adapter: PrismaAdapter(prisma),
   session: { strategy: 'jwt' },
   providers: [
      Credentials({
         credentials: {
            email: {},
            password: {},
         },
         authorize: async (credentials) => {
            const email = credentials.email as string;
            const password = credentials.password as string;

            const user = await prisma.user.findUnique({ where: { email } });
            if (!user || !user.password) return null;

            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) return null;

            return {
               id: user.id,
               email: user.email,
               firstName: user.firstName ?? undefined,
               lastName: user.lastName ?? undefined,
               role: user.role,
               preferredLanguage: user.preferredLanguage,
            };
         },
      }),
   ],
   callbacks: {
      jwt: ({ token, user }) => {
         if (user) {
            token.role = user.role;
            token.id = user.id;
            token.firstName = user.firstName;
            token.preferredLanguage = user.preferredLanguage;
         }
         return token;
      },
      session: ({ session, token }) => {
         if (session.user) {
            session.user.role = token.role as 'PATIENT' | 'DOCTOR';
            session.user.id = token.id as string;
            session.user.firstName = token.firstName as string;
            session.user.preferredLanguage = token.preferredLanguage as string;
         }
         return session;
      },
   },
});