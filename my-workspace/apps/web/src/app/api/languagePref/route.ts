import { NextResponse } from 'next/server';
import { auth } from '@/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ skipped: true });
  }

  const { lang } = await request.json();

  await prisma.user.update({
    where: { id: session.user.id },
    data: { preferredLanguage: lang },
  });

  return NextResponse.json({ ok: true });
}