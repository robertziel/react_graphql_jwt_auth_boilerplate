import { defineMessages } from 'react-intl';

export const scope = 'app.components.ActiveTokens';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: `Where you're logged in`,
  },
  labelBrowser: {
    id: `${scope}.label.browser`,
    defaultMessage: 'Browser',
  },
  labelPlatform: {
    id: `${scope}.label.platform`,
    defaultMessage: 'Platform',
  },
  labelIp: {
    id: `${scope}.label.ip`,
    defaultMessage: 'IP',
  },
  labelLastUsedAt: {
    id: `${scope}.label.lastUsedAt`,
    defaultMessage: 'Last seen at',
  },
  labelExpiresAt: {
    id: `${scope}.label.expiresAt`,
    defaultMessage: 'Expires at',
  },
  labelCreatedAt: {
    id: `${scope}.label.createdAt`,
    defaultMessage: 'Signed in at',
  },
});
