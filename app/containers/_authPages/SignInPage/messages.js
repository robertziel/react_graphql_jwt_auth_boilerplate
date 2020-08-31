import { defineMessages } from 'react-intl';

export const scope = 'app.containers.auth.SignInPage';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Sign in',
  },
  formEmail: {
    id: `${scope}.form.email`,
    defaultMessage: 'E-mail',
  },
  formPassword: {
    id: `${scope}.form.password`,
    defaultMessage: 'Password',
  },
  formButton: {
    id: `${scope}.form.button`,
    defaultMessage: 'Sign in',
  },
  signedInNotify: {
    id: `${scope}.notifications.signedInNotify`,
    defaultMessage: 'You are signed in!',
  },
});
