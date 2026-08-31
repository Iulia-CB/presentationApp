export const authFormDataEn = {
  tabs: [
    { id: 'patient', label: 'Patient' },
    { id: 'doctor', label: 'Doctor' },
  ],
  title: 'Sign in',
  subtitle: 'Access the appointment calendar and patient records.',
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