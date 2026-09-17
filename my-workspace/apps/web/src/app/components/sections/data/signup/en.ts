export const signupFormDataEn = {
   tabs: [
      { id: 'patient', label: 'Patient' },
      { id: 'doctor', label: 'Doctor' },
   ],
   title: 'Sign up',
   subtitleDoctor: 'Create doctor account.',
   subtitlePatient: 'Access your appointments and consultation history.',
   fields: {
      firstName: {
         label: 'First Name',
         type: 'text',
         placeholder: 'Jane',
      },
      lastName: {
         label: 'Last Name',
         type: 'text',
         placeholder: 'Smith',
      },         
      email: {
         label: 'Email',
         type: 'email',
         placeholder: 'name@example.com',
      },
      password: {
         label: 'Password',
         type: 'password',
         placeholder: '••••••••',
      },
   },
   rememberMe: 'Remember me',
   submitLabel: 'Sign up',
   footer: {
      text: "Already have an account?",
      linkLabel: 'Click here.',
   },
};