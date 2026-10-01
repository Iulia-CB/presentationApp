// apps/web/src/app/api/appointments/route.ts
import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
   const session = await auth();
   const body = await request.json();
   const { procedureId, date, notes, firstName, lastName, email, phone } = body;

   if (!procedureId || !date) {
      return NextResponse.json({ error: 'Procedura și data sunt obligatorii.' }, { status: 400 });
   }

   if (!session && (!firstName || lastName || !email || !phone)) {
      return NextResponse.json(
         { error: 'Nume, email și telefon sunt obligatorii pentru programări fără cont.' },
         { status: 400 }
      );
   }

   const doctor = await prisma.user.findFirst({ where: { role: 'DOCTOR' } });
   if (!doctor) {
      return NextResponse.json({ error: 'Nu a putut fi identificat medicul.' }, { status: 500 });
   }

   try {
      const appointment = session
         ? await prisma.appointment.create({
            data: {
               doctorId: doctor.id,
               procedureId,
               date: new Date(date),
               notes,
               patientId: session.user.id,
            },
         })
         : await prisma.appointment.create({
            data: {
               doctorId: doctor.id,
               procedureId,
               date: new Date(date),
               notes,
               guestFirstName: firstName,
               guestLastName: lastName,
               guestEmail: email.trim().toLowerCase(),
               guestPhone: phone,
            },
         });

      return NextResponse.json(appointment, { status: 201 });
   } catch (error) {
      console.error('Appointment creation error:', error);
      return NextResponse.json({ error: 'A apărut o eroare la crearea programării.' }, { status: 500 });
   }
}