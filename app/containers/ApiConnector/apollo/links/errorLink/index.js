import { onError } from '@apollo/client/link/error';
import { unauthorizedNotify } from './notifications';
import { nullifyAuthenticationCredentials } from '../../../actions';
import StoreAccessor from '../../../StoreAccessor';

function signOut() {
  unauthorizedNotify();
  StoreAccessor.store.dispatch(nullifyAuthenticationCredentials());
}

/* eslint-disable default-case */
export const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ extensions }) => {
      switch (extensions.code) {
        case 'AUTHENTICATION_ERROR':
          signOut();
          break;
      }
    });
});
