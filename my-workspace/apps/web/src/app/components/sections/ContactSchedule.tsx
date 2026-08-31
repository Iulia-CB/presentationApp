export default function ContactSchedule({ detail }) {
   return (
      <div
         className="grid grid-cols-1 gap-1 border-b border-stone-700 py-4 sm:grid-cols-[7rem_1fr]"
      >
         <p className="uppercase text-xs">{detail.label}</p>
         <p className="text-taupe-300">{detail.value}</p>
      </div>
   )
}