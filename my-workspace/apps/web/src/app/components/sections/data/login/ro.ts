export const authFormDataRo = {
   tabs: [
      { id: 'patient', label: 'Pacient' },
      { id: 'doctor', label: 'Medic' },
   ],
   title: 'Autentificare',
   subtitleDoctor: 'Acces la agenda de programări și fișele pacienților.',
   subtitlePatient: 'Vezi programările tale și istoricul consultațiilor.',
   fields: {
      email: {
         label: 'E-mail',
         type: 'email',
         placeholder: 'nume@exemplu.ro',
      },
      password: {
         label: 'Parolă',
         type: 'password',
         placeholder: '••••••••',
      },
   },
   rememberMe: 'Ține-mă minte',
   forgotPassword: 'Am uitat parola',
   submitLabel: 'Autentificare',
   footer: {
      text: 'Nu ai cont?',
      linkLabel: 'Creează unul',
   },
};