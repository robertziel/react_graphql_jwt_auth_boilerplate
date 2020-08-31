export function notificationMessageSelector(message) {
  return `.notification-item:not(.fadeOut) .notification-message[children="${message}"]`;
}
