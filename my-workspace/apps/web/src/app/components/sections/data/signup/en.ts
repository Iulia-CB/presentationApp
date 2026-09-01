export const signupFormDataEn = {
   tabs: [
      { id: 'patient', label: 'Patient' },
      { id: 'doctor', label: 'Doctor' },
   ],
   title: 'Sign up',
   subtitleDoctor: 'Create doctor account.',
   subtitlePatient: 'Access your appointments and consultation history.',
   fields: {
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