import { cache } from 'react';
import { prisma } from './prisma';

export const getTranslation = cache(async <TranslatedData = any>(namespace: string, locale: string): Promise<TranslatedData> => {
  const row = await prisma.translation.findUnique({
    where: { namespace_locale: { namespace, locale } },
  });
  if (!row) throw new Error(`Missing translation: ${namespace}/${locale}`);
  return row.content as TranslatedData;
});