import { aboutDataRo } from "./data/about/ro"
import { aboutDataEn } from "./data/about/en"

const translations = { ro: aboutDataRo, en: aboutDataEn };

export default function About({ lang }: { lang: string }) {
   const aboutData = translations[lang as keyof typeof translations] ?? translations.ro;
   return(
      <section id="about" className="grid grid-cols-1 md:grid-cols-2 bg-mist-800 leading-tight"> 
         <div className="">
            <h1 className="mx-4 my-2 uppercase text-taupe-300">{aboutData.eyebrow}</h1>
            <div className="mx-4 my-2 flex flex-col">
               {aboutData.milestones.map((milestone) => (
                  <div 
                     key={milestone.year}
                     className="border-b border-taupe-500 grid grid-cols-[60px_1fr] gap-6 py-5"
                  >
                     <p className="text-xl text-taupe-300 font-serif">{milestone.year}</p>
                     <p className="text-sm text-taupe-400 pt-2">{milestone.description}</p>
                  </div>
               ))}
            </div>
         </div>

         <div className="flex flex-wrap content-around justify-between p-4 text-taupe-400 gap-4">
            <h1 className="italic text-taupe-300 text-2xl">{aboutData.heading}</h1>
            <p>{aboutData.paragraph1}</p>
            <p>{aboutData.paragraph2}</p>
         </div>
      </section>
   )
}