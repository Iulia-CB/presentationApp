import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { authErrorsEn } from '@/app/components/sections/data/register/en';
import { authErrorsRo } from '@/app/components/sections/data/register/ro';

const translations = { en: authErrorsEn, ro: authErrorsRo };

function getAuthErrors(lang: string) {
  return translations[lang as keyof typeof translations] ?? translations.ro;
}

export async function POST(request: Request) {
  const body = await request.json();
  const { firstName, lastName, email, password, role, lang } = body;
  const errors = getAuthErrors(lang);

  try {
    if (!email || !password) {
      return NextResponse.json({ error: errors.missingFields }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: errors.passwordTooShort }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ error: errors.emailTaken }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email: email.trim().toLowerCase(),
        password: hashedPassword,
        role: role === 'DOCTOR' ? 'DOCTOR' : 'PATIENT',
        preferredLanguage: lang === 'en' ? 'en' : 'ro'
      },
    });

    return NextResponse.json(
      { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, role: user.role },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: errors.serverError }, { status: 500 });
  }
}