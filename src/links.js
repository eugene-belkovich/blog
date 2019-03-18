import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { onError } from 'apollo-link-error';
import { getMainDefinition } from 'apollo-utilities';
import { createPersistedQueryLink } from 'apollo-link-persisted-queries';

export const errorLink = onError(({ graphQLErrors, networkError }) => {
  /*
  onError receives a callback in the event a GraphQL or network error occurs.
  This example is a bit contrived, but in the real world, you could connect
  a logging service to the errorLink or perform a specific action in response
  to an error.
  */
  if (graphQLErrors)
    graphQLErrors.map(({ message, location, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${location}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

export const queryOrMutationLink = (config = {}) =>
  // turn on CDN support via GET
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
