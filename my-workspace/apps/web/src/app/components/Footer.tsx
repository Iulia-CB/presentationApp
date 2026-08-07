import Link from "next/link";

export default function Footer() {
   return(
      <footer className="flex justify-between gap-2 text-center border-t p-4">
         <span className="italic leading-tight text-lg">Dr. Atena Muresan</span>
         <small>© 2026 · Cluj-Napoca, România · Acest site nu înlocuiește un consult medical direct </small>
      </footer>
   )
}