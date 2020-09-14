import { store } from 'react-notifications-component';

import { getIntl } from 'containers/LanguageProvider/IntlCatcher';
import defaultSettings from 'containers/NotificationsSystem/defaultSettings';

import messages from './messages';

export function signedUpNotify() {
  store.addNotification({
    ...defaultSettings,
    message: getIntl().formatMessage(messages.signedUpNotify),
    type: 'success',
  });
}

export function signUpFailedNotify() {
  store.addNotification({
    ...defaultSettings,
    message: getIntl().formatMessage(messages.signUpFailedNotify),
    type: 'danger',
  });
}
