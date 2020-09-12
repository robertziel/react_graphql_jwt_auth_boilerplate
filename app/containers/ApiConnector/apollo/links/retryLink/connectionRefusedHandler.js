import dig from 'object-dig';
import {
  connectionRefusedAutodismissableNotify,
  connectionRefusedNotify,
} from '../../../notifications';

let notification;

function removeNotification(notificationId) {
  if (dig(notification, 'id') !== notificationId) {
    return;
  }
  notification && notification.remove(); // eslint-disable-line no-unused-expressions
  notification = undefined;
}

const fetchesQueue = [];

let retryTime = 0; // How long waits till automatical retry (when succeeds resets to 0)
const retryTimeDiff = 10000; // arithmetic sequence difference, retryTime changes after each connection refused report if fetches queue not empty

function resetRetryTime() {
  retryTime = 0;
}

function retryFetches() {
  removeNotification(dig(notification, 'id'));

  let shiftedFetch;

  while (fetchesQueue.length) {
    shiftedFetch = fetchesQueue.shift();

    if (shiftedFetchHasMountedComponent(shiftedFetch)) {
      shiftedFetch.refetchMethod();
    }
  }
}

export function reportConnectionRefused(component, refetchMethod) {
  refetchMethod && fetchesQueue.push({ component, refetchMethod }); // eslint-disable-line no-unused-expressions

  if (fetchesQueue.length) {
    if (retryTime === 0) {
      removeNotification(dig(notification, 'id')); // Remove undismissable notification if exists
    }

    if (!notification) {
      retryTime = retryTimeDiff + retryTime;
      notification = connectionRefusedAutodismissableNotify(
        retryFetches,
        retryTime,
      );
    }
  } else if (!notification) {
    resetRetryTime();
    notification = connectionRefusedNotify(removeNotification);
  }
}

export function reportConnectionSucceeded() {
  resetRetryTime();
  retryFetches();
}

function shiftedFetchHasMountedComponent(shiftedFetch) {
  return shiftedFetch.component.isMounted;
}
