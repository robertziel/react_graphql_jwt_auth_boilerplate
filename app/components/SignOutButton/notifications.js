import { store } from 'react-notifications-component';

import { getIntl } from 'containers/LanguageProvider/IntlCatcher';
import defaultSettings from 'containers/NotificationsSystem/defaultSettings';

import messages from './messages';

export function signedOutNotify() {
  store.addNotification({
    ...defaultSettings,
    message: getIntl().formatMessage(messages.signedOutNotify),
    type: 'success',
    container: 'top-right',
  });
}
