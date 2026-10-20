'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Navbar({
   lang,
   navBarData,
   isLoggedIn = false,
   actions,
}: {
   lang: string;
   navBarData: any;
   isLoggedIn?: boolean;
   actions?: React.ReactNode;
}) {
   const [open, setOpen] = useState(false);
   
   const accountHref = isLoggedIn ? `/${lang}/myAccount` : `/${lang}#auth`;
   const menuLinks = [
      { href: `/${lang}#about`, label: navBarData.about },
      { href: `/${lang}#procedures`, label: navBarData.procedures },
      { href: accountHref, label: navBarData.myAccount },
      { href: `/${lang}#schedule`, label: navBarData.appointment },
   ];

   return (
      <header className="sticky top-0 z-50 border-b-1 flex justify-between items-center text-stone-700 text-sm leading-tight px-8 py-4 bg-stone-50">
         <div className="flex flex-col">
            <Link href={`/${lang}`} className="italic leading-tight text-lg">{navBarData.brand}</Link>
            <span className="text-xs text-stone-500 uppercase tracking-wide">{navBarData.subheading}</span>
         </div>

         {/* Desktop */}
         <nav className="hidden lg:flex items-center gap-8 font-semibold">
            <Link href={`/${lang}#about`} className="hover:underline">{navBarData.about}</Link>
            <Link href={`/${lang}#procedures`} className="hover:underline">{navBarData.procedures}</Link>
         </nav>
         <div className="hidden lg:flex items-center gap-4 font-medium">
            <Link
               href={accountHref}
               className="px-5 py-2.5 transition-colors hover:bg-stone-300"
            >
               {navBarData.myAccount}
            </Link>
            <Link
               href={`/${lang}#schedule`}
               className="rounded-md bg-stone-700 px-5 py-2.5 font-semibold text-white transition-colors hover:bg-stone-500"
            >
               {navBarData.appointment}
            </Link>
            {actions}
         </div>

         {/* Mobile nav */}
         <button
            type="button"
            className="p-2 lg:hidden"
            aria-label="Menu"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
         >
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
               <path d={open ? 'M6 6l12 12M18 6L6 18' : 'M4 7h16M4 12h16M4 17h16'} />
            </svg>
         </button>

         {open && (
            <div className="absolute inset-x-0 top-full z-50 flex flex-col overflow-y-auto bg-stone-50 p-2 font-semibold lg:hidden">   
            {menuLinks.map((l) => (
                  <Link 
                     key={l.href} 
                     href={l.href} 
                     onClick={() => setOpen(false)} 
                     className="px-3 py-3 hover:bg-stone-200"
                  >
                     {l.label}
                  </Link>
               ))}
               {actions && <div className="px-3 py-3">{actions}</div>}
            </div>
         )}
      </header>
   );
}