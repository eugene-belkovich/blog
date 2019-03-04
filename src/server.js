import Express from 'express';
import path from 'path';
import proxy from 'http-proxy-middleware';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import multer from 'multer';

const upload = multer();

import React from 'react';
import ReactDOM from 'react-dom/server';
import { StaticRouter } from 'react-router';

import ApolloClient from 'apollo-client';
import { ApolloProvider, renderToStringWithData } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import fetch from 'node-fetch';
import { createPersistedQueryLink } from 'apollo-link-persisted-queries';

import { errorLink, queryOrMutationLink } from './links';
import Html from './frontend/routes/Html';
import Layout from './frontend/routes/Layout';

// todo implement mongo
// const connectMongo = require('./mongo-connector');

let PORT = 3000;
if (process.env.PORT) {
  PORT = parseInt(process.env.PORT, 10);
}

const API_HOST = 'http://localhost:3010';

const app = new Express();

const apiProxy = proxy({ target: API_HOST, changeOrigin: true });

app.use('/graphql', apiProxy);
app.use('/graphiql', apiProxy);
app.use('/login', apiProxy);
app.use('/logout', apiProxy);

if (process.env.NODE_ENV === 'production') {
  // In production we want to serve our JS from a file on the filesystem.
  app.use('/static', Express.static(path.join(process.cwd(), 'build/client')));
} else {
  // Otherwise we want to proxy the webpack development server.
  app.use(
    '/static',
    proxy({ target: 'http://localhost:3020', pathRewrite: { '^/static': '' } })
  );
}
const links = [
  errorLink,
  queryOrMutationLink({
    fetch,
    uri: `${API_HOST}/graphql`,
  }),
];

// support APQ in production
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

app.use(Express.static('public'));
app.use(cors());
app.use(cookieParser());
app.use(upload.array());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(require('./server/controller'));

app.listen(PORT, () =>
  console.log(
    // eslint-disable-line no-console
    `App Server is now running on http://localhost:${PORT}`
  )
);
