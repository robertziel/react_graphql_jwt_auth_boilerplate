import { store } from 'react-notifications-component';

import { getIntl } from 'containers/LanguageProvider/IntlCatcher';
import defaultSettings from 'containers/NotificationsSystem/defaultSettings';

import messages from './messages';

export function signedInNotify() {
  store.addNotification({
    ...defaultSettings,
    message: getIntl().formatMessage(messages.signedInNotify),
    type: 'success',
  });
}
