import { DefaultSession } from "next-auth";

declare module 'next-auth' {
   interface Session {
      user: {
         role: 'PATIENT' | 'DOCTOR';
      } & DefaultSession['user']
   }

   interface User {
      role: 'PATIENT' | 'DOCTOR';
   }

   declare module '@auth/core/jwt' {
      interface JWT {
         role: 'PATIENT' | 'DOCTOR';
      }
   }
}