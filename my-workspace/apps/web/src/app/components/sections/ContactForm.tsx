'use client'
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

type Procedure = {
   id: string;
   titleRo: string;
   titleEn: string;
}

type ContactFormProps = {
   procedures: Procedure[];
   contactData: any;
   errorsContactData: any;
   lang: string;
}

type ContactErrors = {
   firstName: string;
   lastName: string;
   phone: string;
   email: string;
   procedure: string;
   date: string;
   datePast: string;
   notes: string;
}

function makeSchema(message: ContactErrors) {
   return yup.object({
      firstName: yup.string().trim().required(message.firstName),
      lastName: yup.string().trim().required(message.lastName),
      phone: yup
         .string()
         .trim()
         .matches(/^\+?[0-9\s-]{9,15}$/, message.phone)
         .required(message.phone),
      email: yup.string().trim().email(message.email).required(message.email),
      procedureId: yup.string().required(message.procedure),
      preferredDate: yup
         .string()
         .required(message.date)
         .test('not-past', message.datePast, (value) => {
            if (!value) return false;
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return new Date(value) >= today;
         }),
      notes: yup.string().max(1000, message.notes).default(''),
   });
}

type FormValues = yup.InferType<ReturnType<typeof makeSchema>>;

const inputClass =
   'appearance-none block w-full bg-transparent text-stone-700 border border-stone-400 rounded py-3 px-4 leading-tight focus:outline-none focus:border-stone-500';
const labelClass =
   'block uppercase tracking-wide text-stone-500 text-xs font-bold mb-2';
const errorClass = 'mt-1 mb-2 text-xs text-red-700';

export default function ContactForm({ procedures, contactData, errorsContactData, lang }: ContactFormProps) {
   const [serverError, setServerError] = useState<string | null>(null);
   const [success, setSuccess] = useState(false);

   const {
      register,
      handleSubmit,
      reset,
      formState: { errors, isSubmitting },
   } = useForm<FormValues>({
      resolver: yupResolver(makeSchema(errorsContactData)),
      defaultValues: {
         firstName: '',
         lastName: '',
         phone: '',
         email: '',
         procedureId: procedures[0]?.id ?? '',
         preferredDate: '',
         notes: '',
      },
   });

   async function onSubmit(values: FormValues) {
      setServerError(null);
      setSuccess(false);

      try {
         const res = await fetch('/api/appointments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               firstName: values.firstName,
               lastName: values.lastName,
               email: values.email,
               phone: values.phone,
               procedureId: values.procedureId,
               date: values.preferredDate,
               notes: values.notes,
            }),
         });

         const data = await res.json();

         if (!res.ok) {
            setServerError(data.error ?? contactData.genericError);
            return;
         }

         reset();
         setSuccess(true);
      } catch {
         setServerError(contactData.genericError);
      }
   }

   return (
      <form
         className="w-full max-w-lg p-2"
         onChange={() => setSuccess(false)}
         onSubmit={handleSubmit(onSubmit)}
         noValidate
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
                  type="text"
                  placeholder={contactData.fields.firstName.placeholder}
                  {...register('firstName')}
               />
               {errors.firstName && <p className={errorClass}>{errors.firstName.message}</p>}
               <label
                  className="block uppercase tracking-wide text-stone-500 text-xs font-bold mb-2"
                  htmlFor="lastName"
               >
                  {contactData.fields.lastName.label}
               </label>
               <input
                  className="appearance-none block w-full bg-transparent text-stone-700 border border-stone-400 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:border-stone-500"
                  id="lastName"
                  type="text"
                  placeholder={contactData.fields.lastName.placeholder}
                  {...register('lastName')}
               />
               {errors.lastName && <p className={errorClass}>{errors.lastName.message}</p>}
               <label
                  className="block uppercase tracking-wide text-stone-500 text-xs font-bold mb-2"
                  htmlFor="phone"
               >
                  {contactData.fields.phone.label}
               </label>
               <input
                  className="appearance-none block w-full bg-transparent text-stone-700 border border-stone-400 rounded py-3 px-4 leading-tight focus:outline-none focus:border-stone-500"
                  id="phone"
                  type="tel"
                  placeholder={contactData.fields.phone.placeholder}
                  {...register('phone')}
               />
               {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
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
                  type="email"
                  placeholder={contactData.fields.email.placeholder}
                  {...register('email')}
               />
               {errors.email && <p className={errorClass}>{errors.email.message}</p>}
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
                     {...register('procedureId')}
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
               {errors.procedureId && <p className={errorClass}>{errors.procedureId.message}</p>}
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
                  type="date"
                  placeholder={contactData.fields.preferredDate.placeholder}
                  {...register('preferredDate')}
               />
               {errors.preferredDate && <p className={errorClass}>{errors.preferredDate.message}</p>}
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
                  placeholder={contactData.fields.details.placeholder}
                  {...register('notes')}
               />
               {errors.notes && <p className={errorClass}>{errors.notes.message}</p>}
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
         {serverError && (
            <p
               role="alert"
               className="text-sm text-red-700"
            >
               {serverError}
            </p>
         )}
         <button
            type="submit"
            className="w-full rounded bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-stone-700"
            disabled={isSubmitting}
         >
            {isSubmitting ? '...' : contactData.submitLabel}
         </button>
         <p className="mt-1 text-center text-xs text-stone-500">
            {contactData.disclaimer}
         </p>
      </form>
   )
}