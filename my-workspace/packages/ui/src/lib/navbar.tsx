import Link from "next/link";

export default function Navbar({
   lang,
   navBarData,
   actions,
}: {
   lang: string;
   navBarData: any;
   actions?: React.ReactNode;
}) {
   return(
      <header className="border-b-1 flex justify-between items-center text-stone-700 text-sm leading-tight px-8 py-4 bg-stone-50/40">
         <div className="flex flex-col">
            <Link href={`/${lang}`} className="italic leading-tight text-lg">{navBarData.brand}</Link>
            <span className="text-xs text-stone-500 uppercase tracking-wide">{navBarData.subheading}</span>
         </div>
         <nav className="flex items-center gap-8 font-semibold">
            <Link href="#about" className="hover:underline">{navBarData.about}</Link>
            <Link href="#procedures" className="hover:underline">{navBarData.procedures}</Link>
         </nav>
         <div className="flex items-center gap-4 font-medium">
            <Link
               href='#auth'
               className="px-5 py-2.5 transition-colors hover:bg-stone-300"
            >
               {navBarData.myAccount}
            </Link>
            <Link 
               href='#schedule' 
               className="rounded-md bg-stone-700 px-5 py-2.5 font-semibold text-white transition-colors hover:bg-stone-500"
            >
               {navBarData.appointment}
            </Link>
            {actions}
         </div>
      </header>
   )
}