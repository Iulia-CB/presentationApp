import Link from "next/link";

export default function FooterSection({
   lang,
   footerData,
   actions,
}: {
   lang: string;
   footerData: any;
   actions?: React.ReactNode;
}) {
   return (
      <footer className="flex justify-between gap-2 text-center border-t p-4">
         <Link href={`/${lang}`} className="italic leading-tight text-lg">{footerData.brand}</Link>
         <small>{footerData.legal}</small>
         {actions}
      </footer>
   )
}