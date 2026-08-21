export default function ProcedureCard({ procedure }) {
   return (
      <div className="border border-taupe-500 gap-6 py-5 px-4">
         <p className="text-xl text-taupe-400 font-serif">{procedure.number}</p>
         <p className="text-xl font-serif py-5 text-mist-700">{procedure.title}</p>
         <p className="text-sm font-serif text-taupe-500">{procedure.description}</p>
      </div>
   )
}