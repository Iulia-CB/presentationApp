import { DefaultSession } from "next-auth";

declare module 'next-auth' {
   interface Session {
      user: {
         id: string;
         role: 'PATIENT' | 'DOCTOR';
         firstName?: string;
         preferredLanguage: string;
      } & DefaultSession['user']
   }

   interface User {
      role: 'PATIENT' | 'DOCTOR';
      firstName?: string;
      preferredLanguage: string;
   }

   declare module '@auth/core/jwt' {
      interface JWT {
         role: 'PATIENT' | 'DOCTOR';
         id: string;
         firstName?: string;
         preferredLanguage: string;
      }
   }
}