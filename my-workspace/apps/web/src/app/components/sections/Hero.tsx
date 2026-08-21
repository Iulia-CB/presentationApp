import { heroDataRo } from "./data/hero/ro";
import { heroDataEn } from "./data/hero/en";
import Image from 'next/image';
import Link from "next/link";

const translations = { ro: heroDataRo, en: heroDataEn };

export default function Hero({ lang }: { lang: string }) {
   const heroData = translations[lang as keyof typeof translations] ?? translations.ro;
   return (
      <section
         id="hero"
         className="text-stone-700 leading-tight m-20 flex flex-col gap-12 px-8 py-8 md:flex-row md:px-5 md:py-24"
      >
         <div className="flex-1 items-center">
            <div className="eyebrow text-sm uppercase">
               {heroData.eyebrow}
            </div>
            <h1 className="title mt-4 text-3xl md:5-xl">
               {heroData.title}
            </h1>
            <div className="italic text-5xl md:text-5xl text-olive-400 mb-4">
               {heroData.titleEmphasis}
            </div>
            <div className="description md:pr-10 mb-4">
               {heroData.description}
            </div>

            <div className="cta flex flex-wrap gap-2">
               <Link
                  className="inline-flex items-center justify-center px-5 py-2.5 border rounded-md bg-stone-700 text-white transition-colors hover:bg-stone-500 "
                  href="#contact"
               >
                  {heroData.primaryCta.label}
               </Link>
               <Link
                  className="inline-flex items-center justify-center px-5 py-2.5 border rounded-md transition-colors hover:bg-stone-700 hover:text-white"
                  href="#contact"
               >
                  {heroData.secondaryCta.label}
               </Link>
            </div>

            <hr className="my-8 w-96 border-stone-300" />

            <div className="flex flex-wrap gap-8 md:gap-14">
               {heroData.stats.map((stat) => (
                  <div key={stat.label}>
                     <p className="text-2xl font-serif">{stat.value}</p>
                     <p className="text-xs uppercase text-stone-500 pt-2">{stat.label}</p>
                  </div>
               ))}
            </div>

         </div>
         <div className="flex-1 items-center border border-stone-300">
            <div className="flex justify-center-safe m-4">
               <Image
                  src="/images/face.png"
                  alt="Simetrie faciala"
                  loading="eager"
                  width={300}
                  height={400}
               />
            </div>
            <div className="flex flex-wrap justify-between uppercase text-stone-500 m-4 items-end">
               <div className="">
                  {heroData.faceData1}
               </div>
               <div className="">
                  {heroData.faceData2}
               </div>
            </div>
         </div>
      </section>
   )
}