import { defineMessages } from 'react-intl';

export const scope = 'app.containers.auth.SignInPage';

export default defineMessages({
  signedOutNotify: {
    id: `${scope}.notifications.signedOutNotify`,
    defaultMessage: 'Signed out successfully!',
  },
});
