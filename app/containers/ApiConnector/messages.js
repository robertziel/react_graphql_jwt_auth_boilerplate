import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ApiConnector';

const messages = defineMessages({
  connectionRefusedNotify: {
    id: `${scope}.fetchers.notifications.connectionRefusedNotify`,
    defaultMessage: `
      Cannot connect to the server.
    `,
  },
  connectionRefusedNotifyTitle: {
    id: `${scope}.fetchers.notifications.connectionRefusedNotifyTitle`,
    defaultMessage: `
      Connection error
    `,
  },
  connectionRefusedAutodismissableNotify: {
    id: `${scope}.fetchers.notifications.connectionRefusedAutodismissableNotify`,
    defaultMessage: `
      Cannot connect to the server. Click here to try again.
    `,
  },
});

export default messages;
