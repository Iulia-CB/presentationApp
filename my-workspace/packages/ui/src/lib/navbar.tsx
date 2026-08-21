import Link from "next/link";

export default function Navbar() {
   return(
      <header className="border-b-1 flex justify-between items-center text-stone-700 text-sm leading-tight px-8 py-4 bg-stone-50/40">
         <div className="flex flex-col">
            <Link href="/" className="italic leading-tight text-lg">Dr. Atena Muresan</Link>
            <span className="text-xs text-stone-500 uppercase tracking-wide">Chirurgie Plastică & Estetică</span>
         </div>
         <nav className="flex items-center gap-8 font-semibold">
            <Link href="#about" className="hover:underline">Despre</Link>
            <Link href="#procedures" className="hover:underline">Procedures</Link>
            <Link href="/results" className="hover:underline">Rezultate</Link>
         </nav>
         <div className="flex items-center gap-8 font-medium">
            <Link
               href="/auth"
               className="px-5 py-2.5 transition-colors hover:bg-stone-300"
            >Contul meu</Link>
            <Link 
               href="/contact" 
               className="rounded-md bg-stone-700 px-5 py-2.5 font-semibold text-white transition-colors hover:bg-stone-500"
            >
               Programeaza-te
            </Link>
         </div>
      </header>
   )
}