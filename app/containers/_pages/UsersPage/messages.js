import { defineMessages } from 'react-intl';

export const scope = 'app.containers.UsersPage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Users',
  },
  labelUsername: {
    id: `${scope}.label.username`,
    defaultMessage: 'Username',
  },
  labelEmail: {
    id: `${scope}.label.email`,
    defaultMessage: 'Email',
  },
});
