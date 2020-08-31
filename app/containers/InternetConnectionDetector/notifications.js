import { store } from 'react-notifications-component';

import { getIntl } from 'containers/LanguageProvider/IntlCatcher';
import defaultSettings from 'containers/NotificationsSystem/defaultSettings';

import messages from './messages';

export function internetConnectionBackNotify() {
  store.addNotification({
    ...defaultSettings,
    title: getIntl().formatMessage(messages.internetConnectionBackNotifyTitle),
    message: getIntl().formatMessage(messages.internetConnectionBackNotify),
    type: 'success',
  });
}

export function noInternetConnectionNotify() {
  const notification = store.addNotification({
    ...defaultSettings,
    title: getIntl().formatMessage(messages.noInternetConnectionNotifyTitle),
    message: getIntl().formatMessage(messages.noInternetConnectionNotify),
    type: 'danger',
    dismiss: {
      click: false,
      duration: 0,
      touch: false,
    },
  });

  return {
    remove: () => store.removeNotification(notification),
  };
}
