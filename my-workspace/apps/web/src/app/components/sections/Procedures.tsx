import { proceduresData } from "./data/procedures"

export default function Procedures() {
   return (
      <section id="procedures" className=" m-5 leading-tight">
         <div className="eyebrow">{proceduresData.eyebrow}</div>
         <div className="eyebrow">{proceduresData.title}</div>
         <div className="eyebrow">{proceduresData.note}</div>
         <div className="grid grid-cols-1 md:grid-cols-3">
            {proceduresData.procedures.map((procedure) => (
               <div
                  key={procedure.number}
                  className="border border-taupe-500 gap-6 py-5 px-4"
               >
                  <p className="text-xl text-taupe-300 font-serif">{procedure.number}</p>
                  <p className="text-xl font-serif">{procedure.title}</p>
                  <p className="text-sm font-serif">{procedure.description}</p>
               </div>
            ))}
         </div>
      </section>
   )
}