import { store } from 'react-notifications-component';

import { getIntl } from 'containers/LanguageProvider/IntlCatcher';
import defaultSettings from 'containers/NotificationsSystem/defaultSettings';

import messages from './messages';

export function connectionRefusedAutodismissableNotify(
  refetchMethod,
  retryTime,
) {
  const notification = store.addNotification({
    ...defaultSettings,
    title: getIntl().formatMessage(messages.connectionRefusedNotifyTitle),
    message: getIntl().formatMessage(
      messages.connectionRefusedAutodismissableNotify,
    ),
    type: 'danger',
    dismiss: {
      duration: retryTime,
      pauseOnHover: true,
      showIcon: true,
      onScreen: true,
    },
    onRemoval: refetchMethod,
  });

  return {
    id: notification,
    remove: () => store.removeNotification(notification),
  };
}

export function connectionRefusedNotify(removeNotificationMethod) {
  const notification = store.addNotification({
    ...defaultSettings,
    title: getIntl().formatMessage(messages.connectionRefusedNotifyTitle),
    message: getIntl().formatMessage(messages.connectionRefusedNotify),
    type: 'danger',
    dismiss: {
      duration: 0,
      showIcon: true,
    },
    onRemoval: (id) => {
      removeNotificationMethod(id);
    },
  });

  return {
    id: notification,
    remove: () => store.removeNotification(notification),
  };
}
