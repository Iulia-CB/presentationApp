'use client'
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type LoginFormProps = {
   loginData: any;
   activeTab: string;
   onSwitchToSignup: () => void;
   lang: string;
};

export default function LoginForm({ loginData, activeTab, onSwitchToSignup, lang }: LoginFormProps) {
   const router = useRouter();
   const [error, setError] = useState<string | null>(null);
   const [loading, setLoading] = useState(false);

   async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
      e.preventDefault();
      setError(null);
      setLoading(true);

      const formData = new FormData(e.currentTarget);
      const email = formData.get('email') as string;
      const password = formData.get('password') as string;

      try {
         const result = await signIn('credentials', {
            email,
            password,
            redirect: false,
         });

         if (result?.error) {
            setError(loginData.signInErrors);
            setLoading(false);
            return;
         }

         router.push(`/${lang}/myAccount`);
         router.refresh();
      } catch {
         setError(loginData.unexpectedError);
         setLoading(false);
      }
   }

   return (
      <form onSubmit={handleSubmit} className="mt-6 space-y-5">

         {/* Title */}
         <h2 className="font-serif text-2xl text-stone-800">{loginData.title}</h2>

         {activeTab === 'patient'
            ? (<p className="mt-1 text-sm text-stone-500">{loginData.subtitlePatient}</p>)
            : (<p className="mt-1 text-sm text-stone-500">{loginData.subtitleDoctor}</p>)
         }

         {/* Sign in fields */}
         <div>
            <label
               htmlFor="email"
               className="block text-xs font-semibold uppercase tracking-wide text-stone-500"
            >
               {loginData.fields.email.label}
            </label>
            <input
               id="email"
               name="email"
               type={loginData.fields.email.type}
               placeholder={loginData.fields.email.placeholder}
               className="mt-2 block w-full rounded border border-stone-300 bg-transparent px-4 py-3 text-stone-700 leading-tight focus:border-stone-500 focus:outline-none"
            />
         </div>

         <div>
            <label
               htmlFor="password"
               className="block text-xs font-semibold uppercase tracking-wide text-stone-500"
            >
               {loginData.fields.password.label}
            </label>
            <input
               id="password"
               name="password"
               type={loginData.fields.password.type}
               placeholder={loginData.fields.password.placeholder}
               className="mt-2 block w-full rounded border border-stone-300 bg-transparent px-4 py-3 text-stone-700 leading-tight focus:border-stone-500 focus:outline-none"
            />
         </div>

         <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-stone-600">
               <input type="checkbox" className="h-4 w-4 rounded border-stone-300" />
               {loginData.rememberMe}
            </label>
            <a href="#" className="text-orange-700 hover:underline">
               {loginData.forgotPassword}
            </a>
         </div>

         {error && <p className="text-sm text-red-600">{error}</p>}

         <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-stone-700 cursor-pointer"
         >
            {loading ? '...' : loginData.submitLabel}
         </button>

         <p className="text-center text-sm text-stone-500">
            {loginData.footer.text}{' '}
            <button
               type="button"
               className="text-orange-700 hover:underline cursor-pointer"
               onClick={onSwitchToSignup}
            >
               {loginData.footer.linkLabel}
            </button>
         </p>
      </form>
   );
}