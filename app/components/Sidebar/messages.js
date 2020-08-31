import { defineMessages } from 'react-intl';

export const scope = 'app.components.Sidebar';

export default defineMessages({
  dashboradPage: {
    id: `${scope}.links.dashboardPage`,
    defaultMessage: 'Dashboard',
  },
  multipleChoice: {
    id: `${scope}.links.multipleChoice`,
    defaultMessage: 'Multiple choice',
  },
  notFoundPage: {
    id: `${scope}.links.notFoundPage`,
    defaultMessage: 'Not found page',
  },
  onePage: {
    id: `${scope}.links.onePage`,
    defaultMessage: 'Page One',
  },
  twoPage: {
    id: `${scope}.links.twoPage`,
    defaultMessage: 'Page Two',
  },
  threePage: {
    id: `${scope}.links.threePage`,
    defaultMessage: 'Page Three',
  },
  profilePage: {
    id: `${scope}.links.profilePage`,
    defaultMessage: 'Profile',
  },
  usersPage: {
    id: `${scope}.links.usersPage`,
    defaultMessage: 'Users',
  },
});
