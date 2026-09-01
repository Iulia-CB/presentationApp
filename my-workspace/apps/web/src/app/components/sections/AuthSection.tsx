
'use client';
import { useState } from "react";
import { authFormDataEn } from "./data/login/en";
import { authFormDataRo } from "./data/login/ro";
import { signupFormDataEn } from "./data/signup/en";
import { signupFormDataRo } from "./data/signup/ro";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const translations = { ro: authFormDataRo, en: authFormDataEn };
const signupFormTranslations = { ro: signupFormDataRo, en: signupFormDataEn }

export default function AuthSection({ lang }: { lang: string }) {
   const formData = translations[lang as keyof typeof translations] ?? translations.ro;
   const signupFormData = signupFormTranslations[lang as keyof typeof signupFormTranslations] ?? signupFormTranslations.ro;

   const [activeTab, setActiveTab] = useState(formData.tabs[0].id);
   const [view, setView] = useState('login')

   return (
      <div className="mx-auto w-full max-w-md border border-stone-300 bg-taupe-200 p-8 m-8 leading-tight">
         {/* Tab toggle between patient and doctor */}
         <div className="mb-8 grid grid-cols-2 overflow-hidden rounded-md border border-stone-300">
            {formData.tabs.map((tab) => (
               <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-2.5 text-sm font-semibold cursor-pointer transition-colors ${activeTab === tab.id
                     ? 'bg-stone-900 text-white'
                     : 'bg-transparent text-stone-700 hover:bg-stone-200'
                     }`}
               >
                  {tab.label}
               </button>
            ))}
         </div>

         {/* Form */}
         <form className="mt-6 space-y-5">
            {view === 'login'
               ? (
                  <LoginForm
                     formData={formData}
                     activeTab={activeTab}
                     onSwitchToSignup={() => setView('signup')}
                  />
               )
               : (
                  <SignupForm
                     signupFormData={signupFormData}
                     activeTab={activeTab}
                     onSwitchToLogin={() => setView('login')}
                  />
               )
            }
         </form>
      </div>
   );
}