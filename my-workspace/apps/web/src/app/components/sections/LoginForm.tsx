type LoginFormProps = {
   formData: any; // see note below on typing this properly instead of `any`
   activeTab: string;
   onSwitchToSignup: () => void;
};

export default function LoginForm({ formData, activeTab, onSwitchToSignup }: LoginFormProps) {

   return (
      <div className="mt-6 space-y-5">

         {/* Title */}
         <h2 className="font-serif text-2xl text-stone-800">{formData.title}</h2>

         {activeTab === 'patient'
            ? (<p className="mt-1 text-sm text-stone-500">{formData.subtitlePatient}</p>)
            : (<p className="mt-1 text-sm text-stone-500">{formData.subtitleDoctor}</p>)
         }

         {/* Sign in fields */}
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
            className="w-full rounded-md bg-stone-900 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-stone-700 cursor-pointer"
         >
            {formData.submitLabel}
         </button>

         <p className="text-center text-sm text-stone-500">
            {formData.footer.text}{' '}
            <button
               type="button"
               className="text-orange-700 hover:underline cursor-pointer"
               onClick={onSwitchToSignup}
            >
               {formData.footer.linkLabel}
            </button>
         </p>
      </div>
   );
}