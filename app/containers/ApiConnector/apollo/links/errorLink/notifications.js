import { store } from 'react-notifications-component';

import { getIntl } from 'containers/LanguageProvider/IntlCatcher';
import defaultSettings from 'containers/NotificationsSystem/defaultSettings';

import messages from './messages';

export function unauthorizedNotify() {
  store.addNotification({
    ...defaultSettings,
    title: getIntl().formatMessage(messages.unauthorizedNotifyTitle),
    message: getIntl().formatMessage(messages.unauthorizedNotify),
    type: 'info',
  });
}
