'use client'

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

type SignupFormProps = {
   signupFormData: any;
   activeTab: string;
   onSwitchToLogin: () => void;
   lang: string;
};

export default function SignupForm({ signupFormData, activeTab, onSwitchToLogin, lang }: SignupFormProps) {
   const router = useRouter();
   const [error, setError] = useState<string | null>(null);
   const [loading, setLoading] = useState(false);

   async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
      e.preventDefault();
      setError(null);
      setLoading(true);

      const formData = new FormData(e.currentTarget);
      const firstName = formData.get('firstName') as string;
      const lastName = formData.get('lastName') as string;
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;
      const role = activeTab === 'doctor' ? 'DOCTOR' : 'PATIENT';

      try {
         const res = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName, lastName, email, password, role, lang }),
         });

         const data = await res.json();

         if (!res.ok) {
            setError(data.error);
            setLoading(false);
            return;
         }

         const signInResult = await signIn('credentials', {
            email,
            password,
            redirect: false,
         });

         if (signInResult?.error) {
            setError('Account was created. Please sign in again.');
            setLoading(false);
            return;
         }

         router.push(`/${lang}/myAccount`);
         router.refresh();

      } catch {
         setError('An unexpected error ocurred.');
         setLoading(false);
      }
   }

   return (
      <form onSubmit={handleSubmit} className="mt-6 space-y-5">

         <h2 className="font-serif text-2xl text-stone-800">{signupFormData.title}</h2>

         {activeTab === 'patient'
            ? (<p className="mt-1 text-sm text-stone-500">{signupFormData.subtitlePatient}</p>)
            : (<p className="mt-1 text-sm text-stone-500">{signupFormData.subtitleDoctor}</p>)
         }

         <div>
            <label
               htmlFor="firstName"
               className="block text-xs font-semibold uppercase tracking-wide text-stone-500"
            >
               {signupFormData.fields.firstName.label}
            </label>
            <input
               id="firstName"
               name="firstName"
               type={signupFormData.fields.firstName.type}
               placeholder={signupFormData.fields.firstName.placeholder}
               className="mt-2 block w-full rounded border border-stone-300 bg-transparent px-4 py-3 text-stone-700 leading-tight focus:border-stone-500 focus:outline-none"
            />
         </div>

         <div>
            <label
               htmlFor="lastName"
               className="block text-xs font-semibold uppercase tracking-wide text-stone-500"
            >
               {signupFormData.fields.lastName.label}
            </label>
            <input
               id="lastName"
               name="lastName"
               type={signupFormData.fields.lastName.type}
               placeholder={signupFormData.fields.lastName.placeholder}
               className="mt-2 block w-full rounded border border-stone-300 bg-transparent px-4 py-3 text-stone-700 leading-tight focus:border-stone-500 focus:outline-none"
            />
         </div>         

         <div>
            <label
               htmlFor="email"
               className="block text-xs font-semibold uppercase tracking-wide text-stone-500"
            >
               {signupFormData.fields.email.label}
            </label>
            <input
               id="email"
               name="email"
               type={signupFormData.fields.email.type}
               placeholder={signupFormData.fields.email.placeholder}
               className="mt-2 block w-full rounded border border-stone-300 bg-transparent px-4 py-3 text-stone-700 leading-tight focus:border-stone-500 focus:outline-none"
            />
         </div>

         <div>
            <label
               htmlFor="password"
               className="block text-xs font-semibold uppercase tracking-wide text-stone-500"
            >
               {signupFormData.fields.password.label}
            </label>
            <input
               id="password"
               name="password"
               type={signupFormData.fields.password.type}
               placeholder={signupFormData.fields.password.placeholder}
               className="mt-2 block w-full rounded border border-stone-300 bg-transparent px-4 py-3 text-stone-700 leading-tight focus:border-stone-500 focus:outline-none"
            />
         </div>

         {error && <p className="text-sm text-red-600">{error}</p>}

         <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-stone-700 cursor-pointer"
         >
            {loading ? '...' : signupFormData.submitLabel}
         </button>

         <p className="text-center text-sm text-stone-500">
            {signupFormData.footer.text}{' '}
            <button
               type="button"
               className="text-orange-700 hover:underline cursor-pointer"
               onClick={onSwitchToLogin}
            >
               {signupFormData.footer.linkLabel}
            </button>
         </p>
      </form>
   );
}