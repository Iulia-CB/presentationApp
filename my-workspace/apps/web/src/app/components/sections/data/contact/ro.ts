export const contactDataRo = {
   eyebrow: 'Programare',
   heading: 'Rezervă o consultație',
   description:
      'Completează formularul — programarea este salvată direct în agenda clinicii, iar confirmarea ajunge pe e-mail și SMS.',
   details: [
      { label: 'Program', value: 'Luni – Vineri, 10:00 – 18:00' },
      { label: 'Locație', value: 'Str. Memorandumului 12, Cluj-Napoca' },
      { label: 'Urgențe', value: 'Consultații prioritare în 48h, la cerere' },
   ],
   fields: {
      fullName: { label: 'Nume complet', type: 'text', placeholder: 'Ex: Ana Popescu' },
      phone: { label: 'Telefon', placeholder: '07xx xxx xxx' },
      email: { label: 'E-mail', placeholder: 'nume@exemplu.ro' },
      procedure: { label: 'Procedură de interes', options: ['Rinoplastie'] },
      preferredDate: { label: 'Data preferată', placeholder: 'mm/dd/yyyy' },
      details: { label: 'Detalii suplimentare (opțional)', placeholder: 'Orice context util pentru consultație' },
   },
   submitLabel: 'Trimite cererea de programare',
   disclaimer: 'Aceasta este o solicitare — echipa confirmă ora exactă în maximum 24h lucrătoare.',
};