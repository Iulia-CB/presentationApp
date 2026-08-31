import { contactDataEn } from "./data/contact/en";
import { contactDataRo } from "./data/contact/ro";
import ContactSchedule from "./ContactSchedule";
import ContactForm from "./ContactForm";

const translations = { ro: contactDataRo, en: contactDataEn };

export default function Procedures({ lang }: { lang: string }) {
  const contactData = translations[lang as keyof typeof translations] ?? translations.ro;
   return(
      <section
         id="schedule"
         className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 bg-mist-800 leading-tight items-center gap-12 px-12 py-24"
      > 
         <div className="pl-4 py-4 text-stone-400">
            <h1 className="uppercase text-xs">{contactData.eyebrow}</h1>
            <p className="py-2 text-3xl text-taupe-300">{contactData.heading}</p>
            <p className="py-2 text-sm">{contactData.description}</p>
            <div >
               {contactData.details.map((detail) => (
                  <ContactSchedule key={detail.label} detail={detail} />
               ))}
            </div>
         </div>

         <div className="mx-auto w-full max-w-md bg-stone-200 p-4">
            <ContactForm contactData={contactData}/>
         </div>
      </section>
   )
}