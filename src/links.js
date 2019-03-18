import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { getMainDefinition } from 'apollo-utilities';
import { createPersistedQueryLink } from 'apollo-link-persisted-queries';

export const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, location, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${location}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

export const queryOrMutationLink = (config = {}) =>
  createPersistedQueryLink({ useGETForHashedQueries: true }).concat(
    new HttpLink({
      ...config,
      credentials: 'same-origin',
    })
  );

export const requestLink = ({ queryOrMutationLink }) =>
  ApolloLink.split(({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition';
  }, queryOrMutationLink);
