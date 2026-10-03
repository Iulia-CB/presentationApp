
'use client';
import { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

export default function AuthSection({ loginData, signupFormData, lang }: { loginData: any; signupFormData: any; lang: string; }) {
   const [activeTab, setActiveTab] = useState(loginData.tabs[0].id);
   const [view, setView] = useState('login')

   return (
      <section
         id="auth" 
         className="mx-auto w-full max-w-md border border-stone-300 bg-taupe-200 p-8 m-8 leading-tight"
      >
         {/* Tab toggle between patient and doctor */}
         <div className="mb-8 grid grid-cols-2 overflow-hidden rounded-md border border-stone-300">
            {loginData.tabs.map((tab) => (
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
         <div className="mt-6 space-y-5">
            {view === 'login'
               ? (
                  <LoginForm
                     loginData={loginData}
                     activeTab={activeTab}
                     onSwitchToSignup={() => setView('signup')}
                     lang={lang}
                  />
               )
               : (
                  <SignupForm
                     signupFormData={signupFormData}
                     activeTab={activeTab}
                     onSwitchToLogin={() => setView('login')}
                     lang={lang}
                  />
               )
            }
         </div>
      </section>
   );
}