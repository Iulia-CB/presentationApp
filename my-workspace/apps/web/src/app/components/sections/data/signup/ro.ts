export const signupFormDataRo = {
   tabs: [
      { id: 'patient', label: 'Pacient' },
      { id: 'doctor', label: 'Medic' },
   ],
   title: 'Creare cont',
   subtitleDoctor: 'Creeaza cont ca medic.',
   subtitlePatient: 'Vezi programările tale și istoricul consultațiilor.',
   fields: {
      firstName: {
         label: 'Prenume',
         type: 'text',
         placeholder: 'Ana',
      },
      lastName: {
         label: 'Nume',
         type: 'text',
         placeholder: 'Constantin',
      },       
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
   submitLabel: 'Sign up',
   footer: {
      text: 'Ai deja cont?',
      linkLabel: 'Click aici.',
   },
};