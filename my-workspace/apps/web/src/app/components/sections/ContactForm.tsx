'use client'
import { useState } from "react";

type Procedure = {
   id: string;
   titleRo: string;
   titleEn: string;
}

type ContactFormProps = {
   procedures: Procedure[];
   contactData: any;
   lang: string;
}

export default function ContactForm({ procedures, contactData, lang }: ContactFormProps) {
   const [error, setError] = useState<string | null>(null);
   const [loading, setLoading] = useState(false);
   const [success, setSuccess] = useState(false);

   async function handleAppointment(e: React.SubmitEvent<HTMLFormElement>) {
      e.preventDefault();
      const form = e.currentTarget;
      setError(null);
      setLoading(true);
      setSuccess(false);

      const formData = new FormData(form);

      try {
         const res = await fetch('/api/appointments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               firstName: formData.get('firstName'),
               lastName: formData.get('lastName'),
               email: formData.get('email'),
               phone: formData.get('phone'),
               procedureId: formData.get('procedureId'),
               date: formData.get('preferredDate'),
               notes: formData.get('notes'),
            })
         })

         const data = await res.json();

         if (!res.ok) {
            setError(data.error);
            return;
         }

         form.reset();

         setSuccess(true);
         setLoading(false);

      } catch {
         setError(contactData.genericError)
      } finally {

      }
   }

   return (
      <form
         className="w-full max-w-lg p-2"
         onChange={() => setSuccess(false)}
         onSubmit={handleAppointment}
      >
         <div className="flex flex-wrap -mx-3 mb-3">
            <div className="w-full px-2 mb-2 md:mb-0">
               <label
                  className="block uppercase tracking-wide text-stone-500 text-xs font-bold mb-2"
                  htmlFor="firstName"
               >
                  {contactData.fields.firstName.label}
               </label>
               <input
                  className="appearance-none block w-full bg-transparent text-stone-700 border border-stone-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-stone-500"
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder={contactData.fields.firstName.placeholder}
               />
               <label
                  className="block uppercase tracking-wide text-stone-500 text-xs font-bold mb-2"
                  htmlFor="lastName"
               >
                  {contactData.fields.lastName.label}
               </label>
               <input
                  className="appearance-none block w-full bg-transparent text-stone-700 border border-stone-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-stone-500"
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder={contactData.fields.lastName.placeholder}
               />
               <label
                  className="block uppercase tracking-wide text-stone-500 text-xs font-bold mb-2"
                  htmlFor="phone"
               >
                  {contactData.fields.phone.label}
               </label>
               <input
                  className="appearance-none block w-full bg-transparent text-stone-700 border border-stone-400 rounded py-3 px-4 leading-tight focus:outline-none focus:border-stone-500"
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder={contactData.fields.phone.placeholder}
               />
            </div>
         </div>
         <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
               <label
                  className="block uppercase tracking-wide text-stone-500 text-xs font-bold mb-2"
                  htmlFor="email"
               >
                  {contactData.fields.email.label}
               </label>
               <input
                  className="appearance-none block w-full bg-transparent text-stone-700 border border-stone-400 rounded py-3 px-4 leading-tight focus:outline-none focus:border-stone-500"
                  id="email"
                  name="email"
                  type="email"
                  placeholder={contactData.fields.email.placeholder}
               />
            </div>
         </div>
         <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
               <label
                  className="block uppercase tracking-wide text-stone-500 text-xs font-bold mb-2"
                  htmlFor="procedureId">
                  {contactData.fields.procedure.label}
               </label>
               <div className="relative">
                  <select
                     className="block appearance-none w-full bg-transparent border border-stone-400 text-stone-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-stone-500"
                     id="procedureId"
                     name="procedureId"
                  >
                     {procedures.map((procedure) => (
                        <option
                           key={procedure.id}
                           value={procedure.id}
                        >
                           {lang === 'en' ? procedure.titleEn : procedure.titleRo}
                        </option>
                     ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-stone-500">
                     <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                  </div>
               </div>
            </div>
            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
               <label
                  className="block uppercase tracking-wide text-stone-500 text-xs font-bold mb-2"
                  htmlFor="preferredDate"
               >
                  {contactData.fields.preferredDate.label}
               </label>
               <input
                  className="appearance-none block w-full bg-transparent text-stone-700 border border-stone-400 rounded py-3 px-4 leading-tight focus:outline-none focus:border-stone-500"
                  id="preferredDate"
                  name="preferredDate"
                  type="date"
                  placeholder={contactData.fields.preferredDate.placeholder}
               />
            </div>
         </div>
         <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 m">
               <label
                  className="block uppercase tracking-wide text-stone-500 text-xs font-bold mb-2"
                  htmlFor="notes"
               >
                  {contactData.fields.details.label}
               </label>
               <textarea
                  className="w-full bg-transparent text-stone-700 text-xs border border-stone-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-stone-500"
                  id="notes"
                  name="notes"
                  placeholder={contactData.fields.details.placeholder}
               />
            </div>
         </div>
         {success && (
            <p
               role="status"
               className="text-sm text-green-700"
            >
               {contactData.successMessage}
            </p>
         )}
         {error && (
            <p
               role="alert"
               className="text-sm text-red-700"
            >
               {error}
            </p>
         )}
         <button
            type="submit"
            className="w-full rounded bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-stone-700"
            disabled={loading}
         >
            {loading ? '...' : contactData.submitLabel}
         </button>
         <p className="mt-1 text-center text-xs text-stone-500">
            {contactData.disclaimer}
         </p>
      </form>
   )
}