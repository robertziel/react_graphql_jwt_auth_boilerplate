import { setContext } from 'apollo-link-context';
import StoreAccessor from '../../StoreAccessor';

function getAuthenticationToken() {
  return StoreAccessor.store.getState().backendApiConnector.authenticationToken;
}

// function getLanguageLocale() {
//   return StoreAccessor.store.getState().language.locale;
// }

export const contextLink = setContext((_, { headers }) => {
  const token = getAuthenticationToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
