
'use client';
import { useState } from "react";
import { authFormDataEn } from "./data/authForm/en";
import { authFormDataRo } from "./data/authForm/ro";

const translations = { ro: authFormDataRo, en: authFormDataEn };

export default function AuthForm({ lang }: { lang: string }) {
   const formData = translations[lang as keyof typeof translations] ?? translations.ro;

   const [activeTab, setActiveTab] = useState(formData.tabs[0].id);

   return (
      <div className="mx-auto w-full max-w-md border border-stone-300 bg-stone-200 p-8 m-8">
         {/* Tab toggle */}
         <div className="mb-8 grid grid-cols-2 overflow-hidden rounded-md border border-stone-300">
            {formData.tabs.map((tab) => (
               <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2.5 text-sm font-semibold transition-colors ${activeTab === tab.id
                        ? 'bg-stone-900 text-white'
                        : 'bg-transparent text-stone-700 hover:bg-stone-200'
                     }`}
               >
                  {tab.label}
               </button>
            ))}
         </div>

         {/* Title */}
         <h2 className="font-serif text-2xl text-stone-800">{formData.title}</h2>
         <p className="mt-1 text-sm text-stone-500">{formData.subtitle}</p>

         {/* Form */}
         <form className="mt-6 space-y-5">
            <div>
               <label
                  htmlFor="email"
                  className="block text-xs font-semibold uppercase tracking-wide text-stone-500"
               >
                  {formData.fields.email.label}
               </label>
               <input
                  id="email"
                  type={formData.fields.email.type}
                  placeholder={formData.fields.email.placeholder}
                  className="mt-2 block w-full rounded border border-stone-300 bg-transparent px-4 py-3 text-stone-700 leading-tight focus:border-stone-500 focus:outline-none"
               />
            </div>

            <div>
               <label
                  htmlFor="password"
                  className="block text-xs font-semibold uppercase tracking-wide text-stone-500"
               >
                  {formData.fields.password.label}
               </label>
               <input
                  id="password"
                  type={formData.fields.password.type}
                  placeholder={formData.fields.password.placeholder}
                  className="mt-2 block w-full rounded border border-stone-300 bg-transparent px-4 py-3 text-stone-700 leading-tight focus:border-stone-500 focus:outline-none"
               />
            </div>

            <div className="flex items-center justify-between text-sm">
               <label className="flex items-center gap-2 text-stone-600">
                  <input type="checkbox" className="h-4 w-4 rounded border-stone-300" />
                  {formData.rememberMe}
               </label>
               <a href="#" className="text-orange-700 hover:underline">
                  {formData.forgotPassword}
               </a>
            </div>

            <button
               type="submit"
               className="w-full rounded-md bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-stone-700"
            >
               {formData.submitLabel}
            </button>

            <p className="text-center text-sm text-stone-500">
               {formData.footer.text}{' '}
               <a href="#" className="text-orange-700 hover:underline">
                  {formData.footer.linkLabel}
               </a>
            </p>
         </form>
      </div>
   );
}