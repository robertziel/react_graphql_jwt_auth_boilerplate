import { createHttpLink } from 'apollo-link-http';
import fetch from 'unfetch';
import { BACKEND_API_URL } from '../../constants';

export const httpLink = createHttpLink({
  uri: BACKEND_API_URL,
  credentials: 'include',
  fetch,
});
