import Link from "next/link";

export default function Navbar() {
   return(
      <nav className="border flex justify-between items-center">
         <Link href="/">Dr. Atena Muresan</Link>
         <Link href="/about">Despre</Link>
         <Link href="/contact">Contact</Link>
         <Link href="/procedures">Procedures</Link>
         <Link href="/results">Rezultate</Link>
         <Link href="/auth">Autentificare</Link>
      </nav>
   )
}