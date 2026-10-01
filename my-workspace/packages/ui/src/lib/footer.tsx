import Link from "next/link";

export default function FooterSection({
   lang,
   actions,
}: {
   lang: string;
   actions?: React.ReactNode;
}) {
   return (
      <footer className="flex justify-between gap-2 text-center border-t p-4">
         <Link href={`/${lang}`} className="italic leading-tight text-lg">Dr. Atena Muresan </Link>
         <small>© 2026 · Cluj-Napoca, România · Acest site nu înlocuiește un consult medical direct </small>
         {actions}
      </footer>
   )
}