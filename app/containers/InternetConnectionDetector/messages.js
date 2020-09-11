import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ApiConnector';

const messages = defineMessages({
  internetConnectionBackNotify: {
    id: `${scope}.fetchers.notifications.internetConnectionBackNotify`,
    defaultMessage: `
      You are back online!
    `,
  },
  internetConnectionBackNotifyTitle: {
    id: `${scope}.fetchers.notifications.internetConnectionBackNotifyTitle`,
    defaultMessage: `
      Online
    `,
  },
  noInternetConnectionNotify: {
    id: `${scope}.fetchers.notifications.noInternetConnectionNotify`,
    defaultMessage: `
      Looks like you are offline, please check your internet connection.
    `,
  },
  noInternetConnectionNotifyTitle: {
    id: `${scope}.fetchers.notifications.noInternetConnectionNotifyTitle`,
    defaultMessage: `
      Offline
    `,
  },
});

export default messages;
