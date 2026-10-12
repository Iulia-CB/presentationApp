import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './generated';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const entries = [
  {
    namespace: 'contactErrors',
    locale: 'ro',
    content: {
      firstName: 'Prenumele este obligatoriu',
      lastName: 'Numele este obligatoriu',
      phone: 'Număr de telefon invalid',
      email: 'Adresă de email invalidă',
      procedure: 'Alege o procedură',
      date: 'Alege o dată',
      datePast: 'Data nu poate fi în trecut',
      notes: 'Maxim 1000 de caractere',
    },
  },
  {
    namespace: 'contactErrors',
    locale: 'en',
    content: {
      firstName: 'First name is required',
      lastName: 'Last name is required',
      phone: 'Invalid phone number',
      email: 'Invalid email address',
      procedure: 'Choose a procedure',
      date: 'Choose a date',
      datePast: 'Date cannot be in the past',
      notes: 'Maximum 1000 characters',
    },
  },
];

async function main() {
  for (const entry of entries) {
    await prisma.translation.upsert({
      where: { namespace_locale: { namespace: entry.namespace, locale: entry.locale } },
      update: {}, // create-only: never overwrite existing rows
      create: entry,
    });
  }
  console.log(`Processed ${entries.length} translation rows.`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });