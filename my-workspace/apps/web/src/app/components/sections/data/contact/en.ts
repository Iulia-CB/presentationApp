export const contactDataEn = {
   eyebrow: 'Booking',
   heading: 'Reserve a consultation',
   description:
      'Fill in the form — the appointment is saved directly in the clinic\'s calendar, and confirmation arrives by email and SMS.',
   details: [
      { label: 'Hours', value: 'Monday – Friday, 10:00 AM – 6:00 PM' },
      { label: 'Location', value: '12 Memorandumului St., Cluj-Napoca' },
      { label: 'Urgent cases', value: 'Priority consultations within 48h, on request' },
   ],
  fields: {
    fullName: { label: 'Full name', placeholder: 'Ex: Ana Popescu' },
    phone: { label: 'Phone', placeholder: '07xx xxx xxx' },
    email: { label: 'Email', placeholder: 'name@example.com' },
    procedure: { label: 'Procedure of interest', type: 'select', options: ['Rhinoplasty'] },
    preferredDate: { label: 'Preferred date', placeholder: 'mm/dd/yyyy' },
    details: { label: 'Additional details (optional)', placeholder: 'Any context useful for the consultation' },
  },
   submitLabel: 'Send appointment request',
   disclaimer: 'This is a request — our team confirms the exact time within 24 business hours.',
};