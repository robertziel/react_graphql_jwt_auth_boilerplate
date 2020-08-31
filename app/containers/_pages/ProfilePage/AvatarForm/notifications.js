import { store } from 'react-notifications-component';

import { getIntl } from 'containers/LanguageProvider/IntlCatcher';
import defaultSettings from 'containers/NotificationsSystem/defaultSettings';

import messages from './messages';

export function avatarUpdateSucceededNotify() {
  store.addNotification({
    ...defaultSettings,
    message: getIntl().formatMessage(messages.avatarUpdateSucceededNotify),
    type: 'success',
  });
}

export function avatarUpdateFailedNotify() {
  store.addNotification({
    ...defaultSettings,
    message: getIntl().formatMessage(messages.avatarUpdateFailedNotify),
    type: 'danger',
  });
}
