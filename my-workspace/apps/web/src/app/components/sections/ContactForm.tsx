export default function ContactForm({ contactData } : { contactData: any }) {
   return (
      <form className="w-full max-w-lg p-2">
         <div className="flex flex-wrap -mx-3 mb-3">
            <div className="w-full md:w-1/2 px-2 mb-2 md:mb-0">
               <label
                  className="block uppercase tracking-wide text-stone-500 text-xs font-bold mb-2"
                  htmlFor="fullName"
               >
                  {contactData.fields.fullName.label}
               </label>
               <input
                  className="appearance-none block w-full bg-transparent text-stone-700 border border-stone-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-stone-500"
                  id="grid-first-name"
                  type="text"
                  placeholder={contactData.fields.fullName.placeholder}
               />
            </div>
            <div className="w-full md:w-1/2 px-3">
               <label
                  className="block uppercase tracking-wide text-stone-500 text-xs font-bold mb-2"
                  htmlFor="grid-last-name"
               >
                  {contactData.fields.phone.label}
               </label>
               <input
                  className="appearance-none block w-full bg-transparent text-stone-700 border border-stone-400 rounded py-3 px-4 leading-tight focus:outline-none focus:border-stone-500"
                  id="grid-last-name"
                  type="tel"
                  placeholder={contactData.fields.phone.placeholder}
               />
            </div>
         </div>
         <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
               <label
                  className="block uppercase tracking-wide text-stone-500 text-xs font-bold mb-2"
                  htmlFor="grid-password"
               >
                  {contactData.fields.email.label}
               </label>
               <input
                  className="appearance-none block w-full bg-transparent text-stone-700 border border-stone-400 rounded py-3 px-4 leading-tight focus:outline-none focus:border-stone-500"
                  id="grid-password"
                  type="email"
                  placeholder={contactData.fields.email.placeholder}
               />
            </div>
         </div>
         <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
               <label
                  className="block uppercase tracking-wide text-stone-500 text-xs font-bold mb-2"
                  htmlFor="grid-state">
                  {contactData.fields.procedure.label}
               </label>
               <div className="relative">
                  <select
                     className="block appearance-none w-full bg-transparent border border-stone-400 text-stone-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-stone-500"
                     id="grid-state"
                  >
                     <option>Rinoplastie</option>
                     <option>Lifting facial</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-stone-500">
                     <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                  </div>
               </div>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
               <label className="block uppercase tracking-wide text-stone-500 text-xs font-bold mb-2" htmlFor="grid-zip">
                  {contactData.fields.preferredDate.label}
               </label>
               <input
                  className="appearance-none block w-full bg-transparent text-stone-700 border border-stone-400 rounded py-3 px-4 leading-tight focus:outline-none focus:border-stone-500"
                  id="grid-zip"
                  type="date"
                  placeholder={contactData.fields.preferredDate.placeholder}
               />
            </div>
         </div>
         <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 m">
               <label
                  className="block uppercase tracking-wide text-stone-500 text-xs font-bold mb-2"
                  htmlFor="message"
               >
                  {contactData.fields.details.label}
               </label>
               <textarea
                  className="w-full bg-transparent text-stone-700 text-xs border border-stone-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-stone-500"
                  id="message"
                  placeholder={contactData.fields.details.placeholder}
               />
            </div>
         </div>
         <button
            type="submit"
            className="w-full rounded bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-stone-700"
         >
            {contactData.submitLabel}
         </button>
         <p className="mt-1 text-center text-xs text-stone-500"> {contactData.disclaimer}</p>
      </form>
   )
}