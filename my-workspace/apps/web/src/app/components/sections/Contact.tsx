import { contactDataEn } from "./data/contact/en";
import { contactDataRo } from "./data/contact/ro";

const translations = { ro: contactDataRo, en: contactDataEn };

export default function Procedures({ lang }: { lang: string }) {
  const contactData = translations[lang as keyof typeof translations] ?? translations.ro;
   return(
      <section
         id="schedule"
         className="grid grid-cols-1 md:grid-cols-2 bg-mist-800 leading-tight items-center gap-12 px-12 py-24"
      > 
         <div className="bg-stone-300">
            <h1 className="mx-4 my-2 uppercase text-black-300">{contactData.eyebrow}</h1>
            <p>{contactData.heading}</p>
            <p>{contactData.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2">
               {contactData.details.map((detail) => (
                  <div key={detail.label}>
                     <p>{detail.label}</p>
                     <p>{detail.value}</p>
                  </div>
               ))}

            </div>
         </div>

         <div className="mx-auto w-full max-w-md">
            2
         </div>
      </section>
   )
}