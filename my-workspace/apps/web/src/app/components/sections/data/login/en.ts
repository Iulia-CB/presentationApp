export const authFormDataEn = {
   tabs: [
      { id: 'patient', label: 'Patient' },
      { id: 'doctor', label: 'Doctor' },
   ],
   title: 'Sign in',
   subtitleDoctor: 'Access the appointment calendar and patient records.',
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
   forgotPassword: 'Forgot password',
   submitLabel: 'Sign in',
   footer: {
      text: "Don't have an account?",
      linkLabel: 'Create one',
   },
};