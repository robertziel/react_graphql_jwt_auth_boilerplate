import { onError } from '@apollo/client/link/error';

export const errorLink = onError((opts) => {
  if (opts.graphQLErrors)
    opts.graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );

  if (opts.networkError) console.log(`[Network error]: ${opts.networkError}`);
});
