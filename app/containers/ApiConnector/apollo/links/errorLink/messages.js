import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ApiConnector.apollo.links.errorLink';

const messages = defineMessages({
  unauthorizedNotify: {
    id: `${scope}.notifications.unauthorizedNotify`,
    defaultMessage: `
      Please sign in to continue.
    `,
  },
  unauthorizedNotifyTitle: {
    id: `${scope}.notifications.unauthorizedNotifyTitle`,
    defaultMessage: `
      Unauthorized
    `,
  },
});

export default messages;
