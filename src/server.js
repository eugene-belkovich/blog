import Express from 'express';

import expressGraphQL from 'express-graphql';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

import React from 'react';
import ReactDOM from 'react-dom/server';
import { StaticRouter } from 'react-router';

import ApolloClient from 'apollo-client';
import { ApolloProvider, renderToStringWithData } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import fetch from 'node-fetch';
import { createPersistedQueryLink } from 'apollo-link-persisted-queries';

import { errorLink, queryOrMutationLink } from './links';
import Html from './routes/Html';
import Layout from './routes/Layout';

import schema from './graphql/';

let PORT = 8080;
if (process.env.PORT) {
  PORT = parseInt(process.env.PORT, 10);
}

const app = new Express();
const db = process.env.MONGODB_URI;
mongoose
  .connect('mongodb://localhost:27017/blog', {
    useCreateIndex: true,
    useNewUrlParser: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(
  '/graphql',
  cors(),
  bodyParser.json(),
  expressGraphQL({
    schema,
    graphiql: true,
  })
);

const links = [
  errorLink,
  queryOrMutationLink({
    fetch,
    uri: 'http://localhost:8080/graphql',
  }),
];

if (process.env.NODE_ENV === 'production') {
  links.unshift(createPersistedQueryLink());
}
app.use((req, res) => {
  const client = new ApolloClient({
    ssrMode: true,
    link: ApolloLink.from(links),
    cache: new InMemoryCache(),
  });

  const context = {};

  const component = (
    <ApolloProvider client={client}>
      <StaticRouter location={req.url} context={context}>
        <Layout />
      </StaticRouter>
    </ApolloProvider>
  );

  renderToStringWithData(component)
    .then(content => {
      res.status(200);
      const html = <Html content={content} client={client} />;
      res.send(`<!doctype html>\n${ReactDOM.renderToStaticMarkup(html)}`);
      res.end();
    })
    .catch(e => {
      console.error('RENDERING ERROR:', e); // eslint-disable-line no-console
      res.status(500);
      res.end(
        `An error occurred. Please submit an issue to [https://github.com/apollographql/GitHunt-React] with the following stack trace:\n\n${
          e.stack
        }`
      );
    });
});

app.listen(PORT, () =>
  console.log(
    // eslint-disable-line no-console
    `App Server is now running on http://localhost:${PORT}`
  )
);
