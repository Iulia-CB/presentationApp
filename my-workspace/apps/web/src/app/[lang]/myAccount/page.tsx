import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { getTranslation } from '@/lib/getTranslations';
import { myAccountDataEn } from './data/en';
import { myAccountDataRo } from './data/ro';

const translations = { ro: myAccountDataRo, en: myAccountDataEn };


export default async function MyAccount({
   params,
}: {
   params: Promise<{ lang: string }>;
}) {
   const { lang } = await params;
   const session = await auth();
   // const myAccountData = translations[lang as keyof typeof translations] ?? translations.ro;
   const myAccountData = await getTranslation('myAccount', lang);

   if (!session) {
      redirect(`/${lang}`);
   }

   const isDoctor = session.user.role === 'DOCTOR';

   const role = isDoctor ? myAccountData.roleDoctor : myAccountData.rolePatient;

   const appointments = await prisma.appointment.findMany({
      where: isDoctor
         ? { doctorId: session.user.id }
         : { patientId: session.user.id },
      orderBy: { date: 'asc' },
      include: {
         procedure: {
         select: { titleRo: true, titleEn: true },
         },
         patient: { select: { email: true, firstName: true, lastName: true } },
         doctor: { select: { email: true, firstName: true, lastName: true } },
      },
   });

   const now = new Date();
   const upcoming = appointments.filter((a) => a.date >= now);
   const past = appointments.filter((a) => a.date < now);

   function procedureTitle(appointment: (typeof appointments)[number]) {
      return lang === 'en' ? appointment.procedure.titleEn : appointment.procedure.titleRo
   }

  function otherPartyLabel(appointment: (typeof appointments)[number]) {
    const person = isDoctor ? appointment.patient : appointment.doctor;
    const name = [person.firstName, person.lastName].filter(Boolean).join(' ');
    return name || person.email;
  }

   return (
      <div className="mx-auto max-w-3xl px-6 py-16">
         <h1 className="font-serif text-2xl text-stone-800">
            {myAccountData.heading}, {session.user.firstName}!
         </h1>
         <p className="mt-1 text-sm uppercase tracking-wide text-stone-400">
           {role}
         </p>

         <section className="mt-10">
            <h2 className="text-lg font-semibold text-stone-700">
               Programări viitoare
            </h2>
            {upcoming.length === 0 ? (
               <p className="mt-2 text-sm text-stone-500">Nu ai programări viitoare.</p>
            ) : (
               <ul className="mt-4 divide-y divide-stone-200">
                  {upcoming.map((a) => (
                     <li key={a.id} className="py-4">
                        <p className="font-medium text-stone-800">{procedureTitle(a)}</p>
                        <p className="text-sm text-stone-500">
                           {a.date.toLocaleDateString('ro-RO')} · {isDoctor ? 'Pacient' : 'Medic'}:{' '}
                           {otherPartyLabel(a)}
                        </p>
                        <p className="text-xs uppercase text-stone-400">{a.status}</p>
                     </li>
                  ))}
               </ul>
            )}
         </section>

         <section className="mt-10">
            <h2 className="text-lg font-semibold text-stone-700">Istoric</h2>
            {past.length === 0 ? (
               <p className="mt-2 text-sm text-stone-500">Niciun istoric momentan.</p>
            ) : (
               <ul className="mt-4 divide-y divide-stone-200">
                  {past.map((a) => (
                     <li key={a.id} className="py-4">
                        <p className="font-medium text-stone-800">{procedureTitle(a)}</p>
                        <p className="text-sm text-stone-500">
                           {a.date.toLocaleDateString('ro-RO')} · {isDoctor ? 'Pacient' : 'Medic'}:{' '}
                           {otherPartyLabel(a)}
                        </p>
                        <p className="text-xs uppercase text-stone-400">{a.status}</p>
                     </li>
                  ))}
               </ul>
            )}
         </section>
      </div>
   );
}