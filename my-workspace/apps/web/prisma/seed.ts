import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './generated';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const procedures = [
  {
    slug: 'rinoplastie',
    titleRo: 'Rinoplastie',
    titleEn: 'Rhinoplasty',
    descriptionRo: 'Corecție structurală și estetică a nasului, cu simulare 3D a rezultatului preconizat.',
    descriptionEn: 'Structural and aesthetic correction of the nose, with 3D simulation of the expected result.',
  },
  {
    slug: 'blefaroplastie',
    titleRo: 'Blefaroplastie',
    titleEn: 'Blepharoplasty',
    descriptionRo: 'Rejuvenare a zonei periorbitale, păstrând expresivitatea naturală a privirii.',
    descriptionEn: 'Rejuvenation of the periorbital area, preserving the natural expressiveness of the gaze.',
  },
  {
    slug: 'lifting-facial',
    titleRo: 'Lifting facial',
    titleEn: 'Facelift',
    descriptionRo: 'Tehnică cu incizii minime, orientată spre un aspect odihnit, nu „tras".',
    descriptionEn: 'Minimal-incision technique aimed at a rested look, not an overdone one.',
  },
  {
    slug: 'augmentare-mamara',
    titleRo: 'Augmentare mamară',
    titleEn: 'Breast augmentation',
    descriptionRo: 'Alegerea implantului pornește de la structura toracică, nu de la o mărime fixă.',
    descriptionEn: 'Implant selection starts from chest structure, not a fixed size.',
  },
  {
    slug: 'abdominoplastie',
    titleRo: 'Abdominoplastie',
    titleEn: 'Abdominoplasty',
    descriptionRo: 'Remodelare a peretelui abdominal, frecvent asociată cu recuperare post-sarcină.',
    descriptionEn: 'Abdominal wall remodeling, frequently associated with post-pregnancy recovery.',
  },
  {
    slug: 'liposculptura',
    titleRo: 'Liposculptură',
    titleEn: 'Liposculpture',
    descriptionRo: 'Redefinire a conturului corporal prin tehnică asistată, cu accent pe simetrie.',
    descriptionEn: 'Body contour redefinition through assisted technique, with focus on symmetry.',
  },
];

async function main() {
  for (const procedure of procedures) {
    await prisma.procedure.upsert({
      where: { slug: procedure.slug },
      update: procedure,
      create: procedure,
    });
  }
  console.log(`Seeded ${procedures.length} procedures.`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });