import { proceduresDataRo } from "./data/procedures/ro"
import { proceduresDataEn } from "./data/procedures/en"
import ProcedureCard from "./ProceduresCard";

const translations = { ro: proceduresDataRo, en: proceduresDataEn };

export default function Procedures({ lang }: { lang: string }) {
   const proceduresData = translations[lang as keyof typeof translations] ?? translations.ro;
   return (
      <section id="procedures" className=" m-5 leading-tight">
         <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="eyebrow uppercase text-stone-700 text-sm pt-4 pl-4">
               {proceduresData.eyebrow}
            </div>
            <div className="eyebrow flex justify-end text-olive-400 p-4">
               {proceduresData.note}
            </div>
            <div className="eyebrow text-stone-500 p-4">
               {proceduresData.title}
            </div>
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3">
            {proceduresData.procedures.map((procedure) => (
               <ProcedureCard key={procedure.number} procedure={procedure} />
            ))}
         </div>
      </section>
   )
}