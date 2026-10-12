import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './generated';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const entries = [
  {
    namespace: 'navbar',
    locale: 'ro',
    content: {
      brand: 'Dr. Atena Muresan',
      subheading: 'Chirurgie Plastică & Estetică',
      about: 'Despre',
      procedures: 'Proceduri',
      myAccount: 'Contul meu',
      appointment: 'Programează-te'
    },
  },
  {
    namespace: 'navbar',
    locale: 'en',
    content: {
      brand: 'Dr. Atena Muresan',
      subheading: 'Plastic & Aesthetic Surgery',
      about: 'About',
      procedures: 'Procedures',
      myAccount: 'My account',
      appointment: 'Book an appointment'
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