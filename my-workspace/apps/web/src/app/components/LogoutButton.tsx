'use client'

import { signOut } from "next-auth/react"

export default function LogoutButton({ lang } : { lang: string }) {
   return(
      <button 
         type="button"
         onClick={() => signOut({ callbackUrl: `/${lang}`} )}
         className="text-sm text-stone-500 hover:text-stone-900 hover:undeline cursor-pointer"
      >
         Log out
      </button>
   )
}