import { ApolloLink, Observable } from 'apollo-link';
import RetryableOperation from './RetryableOperation';

export class RetryLink extends ApolloLink {
  request(operation, nextLink) {
    const retryable = new RetryableOperation(operation, nextLink);
    retryable.start();
    return new Observable((observer) => {
      retryable.subscribe(observer);
      return () => {
        retryable.unsubscribe(observer);
      };
    });
  }
}

export const retryLink = new RetryLink();
