import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import fetch from 'unfetch';
import { BACKEND_API_URL } from '../constants';
import StoreAccessor from '../StoreAccessor';

function getAuthenticationToken() {
  return StoreAccessor.store.getState().backendApiConnector.authenticationToken;
}

// function getLanguageLocale() {
//   return StoreAccessor.store.getState().language.locale;
// }

const httpLink = createHttpLink({
  uri: BACKEND_API_URL,
  credentials: 'include',
  fetch: fetch,
});

const authLink = setContext((_, { headers }) => {
  const token = getAuthenticationToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
