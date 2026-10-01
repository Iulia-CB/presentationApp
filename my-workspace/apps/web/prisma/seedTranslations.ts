
import 'dotenv/config'
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './generated';

import { heroDataEn } from '../src/app/components/sections/data/hero/en';
import { heroDataRo } from '../src/app/components/sections/data/hero/ro';
import { authFormDataEn } from '../src/app/components/sections/data/login/en';
import { authFormDataRo } from '../src/app/components/sections/data/login/ro';
import { aboutDataEn } from '../src/app/components/sections/data/about/en';
import { aboutDataRo } from '../src/app/components/sections/data/about/ro';
import { contactDataEn } from '../src/app/components/sections/data/contact/en';
import { contactDataRo } from '../src/app/components/sections/data/contact/ro';
import { proceduresDataEn } from '../src/app/components/sections/data/procedures/en';
import { proceduresDataRo } from '../src/app/components/sections/data/procedures/ro';
import { authErrorsEn } from '../src/app/components/sections/data/register/en';
import { authErrorsRo } from '../src/app/components/sections/data/register/ro';
import { signupFormDataEn } from '../src/app/components/sections/data/signup/en';
import { signupFormDataRo } from '../src/app/components/sections/data/signup/ro';
import { myAccountDataEn } from '../src/app/[lang]/myAccount/data/en';
import { myAccountDataRo } from '../src/app/[lang]/myAccount/data/ro';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const entries = [
  { namespace: 'hero', locale: 'en', content: heroDataEn },
  { namespace: 'hero', locale: 'ro', content: heroDataRo },

  { namespace: 'authLogin', locale: 'en', content: authFormDataEn },
  { namespace: 'authLogin', locale: 'ro', content: authFormDataRo },

  { namespace: 'about', locale: 'en', content: aboutDataEn },
  { namespace: 'about', locale: 'ro', content: aboutDataRo },

  { namespace: 'contact', locale: 'en', content: contactDataEn },
  { namespace: 'contact', locale: 'ro', content: contactDataRo },

  { namespace: 'procedures', locale: 'en', content: proceduresDataEn },
  { namespace: 'procedures', locale: 'ro', content: proceduresDataRo },

  { namespace: 'authErrors', locale: 'en', content: authErrorsEn },
  { namespace: 'authErrors', locale: 'ro', content: authErrorsRo },

  { namespace: 'authSignup', locale: 'en', content: signupFormDataEn },
  { namespace: 'authSignup', locale: 'ro', content: signupFormDataRo },

  { namespace: 'myAccount', locale: 'en', content: myAccountDataEn },
  { namespace: 'myAccount', locale: 'ro', content: myAccountDataRo },
];

async function main() {
  for (const entry of entries) {
    await prisma.translation.upsert({
      where: { namespace_locale: { namespace: entry.namespace, locale: entry.locale } },
      update: { content: entry.content },
      create: entry,
    });
  }
  console.log(`Seeded ${entries.length} translation rows.`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });