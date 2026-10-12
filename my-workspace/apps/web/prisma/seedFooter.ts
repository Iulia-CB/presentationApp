import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './generated';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const entries = [
  {
    namespace: 'footer',
    locale: 'ro',
    content: {
      brand: 'Dr. Atena Muresan',
      legal: '© 2026 · Cluj-Napoca, România · Acest site nu înlocuiește un consult medical direct.',
    },
  },
  {
    namespace: 'footer',
    locale: 'en',
    content: {
      brand: 'Dr. Atena Muresan',
      legal: '© 2026 · Cluj-Napoca, Romania · This site does not replace a direct medical consultation.',
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