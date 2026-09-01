type SignupFormProps = {
   signupFormData: any; // see note below on typing this properly instead of `any`
   activeTab: string;
   onSwitchToLogin: () => void;
};

export default function SignupForm({ signupFormData, activeTab, onSwitchToLogin }: SignupFormProps) {

   return (
      <div className="mt-6 space-y-5">

         {/* Title */}
         <h2 className="font-serif text-2xl text-stone-800">{signupFormData.title}</h2>

         {activeTab === 'patient'
            ? (<p className="mt-1 text-sm text-stone-500">{signupFormData.subtitlePatient}</p>)
            : (<p className="mt-1 text-sm text-stone-500">{signupFormData.subtitleDoctor}</p>)
         }

         {/* Sign up fields */}
         <div>
            <label
               htmlFor="email"
               className="block text-xs font-semibold uppercase tracking-wide text-stone-500"
            >
               {signupFormData.fields.email.label}
            </label>
            <input
               id="email"
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
               type={signupFormData.fields.password.type}
               placeholder={signupFormData.fields.password.placeholder}
               className="mt-2 block w-full rounded border border-stone-300 bg-transparent px-4 py-3 text-stone-700 leading-tight focus:border-stone-500 focus:outline-none"
            />
         </div>

         <button
            type="submit"
            className="w-full rounded-md bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-stone-700 cursor-pointer"
         >
            {signupFormData.submitLabel}
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
      </div>
   );
}