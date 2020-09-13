import {
  reportConnectionRefused,
  reportConnectionSucceeded,
} from './connectionRefusedHandler';

export default class RetryableOperation {
  constructor(operation, nextLink) {
    this.operation = operation;
    this.nextLink = nextLink;
    this.retryCount = 0;
    this.values = [];
    this.complete = false;
    this.canceled = false;
    this.observers = [];
    this.currentSubscription = null;
    this.onNext = (value) => {
      this.values.push(value);
      this.observers.forEach((observer) => {
        if (observer) {
          observer.next(value);
        }
      });
    };
    this.onComplete = () => {
      this.complete = true;
      this.observers.forEach((observer) => {
        if (observer) {
          observer.complete();
        }
      });
      reportConnectionSucceeded();
    };
    this.onError = async () => {
      if (this.operation.getContext().disableRetry) {
        this.observers.forEach((observer) => {
          if (observer) {
            observer.complete();
          }
        });
      } else {
        const object = this;
        reportConnectionRefused({ isMounted: true }, () => {
          object.try();
        });
      }
    };
  }

  /**
   * Register a new observer for this operation.
   *
   * If the operation has previously emitted other events, they will be
   * immediately triggered for the observer.
   */
  subscribe(observer) {
    if (this.canceled) {
      throw new Error(
        `Subscribing to a retryable link that was canceled is not supported`,
      );
    }
    this.observers.push(observer);
    // If we've already begun, catch this observer up.
    this.values.forEach((value) => {
      observer.next(value);
    });
    if (this.complete) {
      observer.complete();
    } else if (this.error) {
      observer.error(this.error);
    }
  }

  /**
   * Remove a previously registered observer from this operation.
   *
   * If no observers remain, the operation will stop retrying, and unsubscribe
   * from its downstream link.
   */
  unsubscribe(observer) {
    const index = this.observers.indexOf(observer);
    if (index < 0) {
      throw new Error(
        `RetryLink BUG! Attempting to unsubscribe unknown observer!`,
      );
    }
    // Note that we are careful not to change the order of length of the array,
    // as we are often mid-iteration when calling this method.
    this.observers[index] = null;
    // If this is the last observer, we're done.
    if (this.observers.every((o) => o === null)) {
      this.cancel();
    }
  }

  /**
   * Start the initial request.
   */
  start() {
    if (this.currentSubscription) return; // Already started.
    this.try();
  }

  /**
   * Stop retrying for the operation, and cancel any in-progress requests.
   */
  cancel() {
    if (this.currentSubscription) {
      this.currentSubscription.unsubscribe();
    }
    clearTimeout(this.timerId);
    this.timerId = null;
    this.currentSubscription = null;
    this.canceled = true;
  }

  try() {
    this.currentSubscription = this.nextLink(this.operation).subscribe({
      next: this.onNext,
      error: this.onError,
      complete: this.onComplete,
    });
  }
}
