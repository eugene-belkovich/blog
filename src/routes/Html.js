import React from 'react';

const Html = ({ content, client: { cache } }) => (
  <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>SSRExample</title>
    </head>
    <body>
      <div id="content" dangerouslySetInnerHTML={{ __html: content }} />
      <div id="footer">Footer</div>
      <script
        charSet="UTF-8"
        dangerouslySetInnerHTML={{
          __html: `window.__APOLLO_STATE__=${JSON.stringify(cache.extract())};`,
        }}
      />
      <script src="/static/bundle.js" charSet="UTF-8" />
    </body>
  </html>
);

export default Html;
