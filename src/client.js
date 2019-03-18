import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { ApolloLink } from 'apollo-link';
import { InMemoryCache } from 'apollo-cache-inmemory';

import 'babel-polyfill';
import './style/index.css';

import { errorLink, queryOrMutationLink, requestLink } from './links';
import Layout from './routes/Layout';

const links = [
  errorLink,
  requestLink({
    queryOrMutationLink: queryOrMutationLink(),
  }),
];

const client = new ApolloClient({
  ssrForceFetchDelay: 100,
  link: ApolloLink.from(links),
  connectToDevTools: true,
  // here we're initializing the cache with the data from the server's cache
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
});

hydrate(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('content')
);
