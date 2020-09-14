import { defineMessages } from 'react-intl';

export const scope = 'app.containers.auth.SignUpPage';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Sign up',
  },
  formFirstName: {
    id: `${scope}.form.firstName`,
    defaultMessage: 'First name',
  },
  formLastName: {
    id: `${scope}.form.lastName`,
    defaultMessage: 'Last name',
  },
  formEmail: {
    id: `${scope}.form.email`,
    defaultMessage: 'E-mail',
  },
  formPassword: {
    id: `${scope}.form.password`,
    defaultMessage: 'Password',
  },
  formPasswordConfirmation: {
    id: `${scope}.form.passwordConfirmation`,
    defaultMessage: 'Confirm password',
  },
  formButton: {
    id: `${scope}.form.button`,
    defaultMessage: 'Sign up',
  },
  signIn: {
    id: `${scope}.form.signIn`,
    defaultMessage: `Have an account? Sign in here!`,
  },
  signedUpNotify: {
    id: `${scope}.notifications.signedInNotify`,
    defaultMessage: 'Your account has been created!',
  },
  signUpFailedNotify: {
    id: `${scope}.notifications.signedInNotify`,
    defaultMessage: 'Could not create account',
  },
});
