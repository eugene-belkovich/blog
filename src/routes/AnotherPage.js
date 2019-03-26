import React from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

const GET_ARTICLES = gql`
  {
    article {
      id
      name
    }
  }
`;

const AnotherPage = ({ onDogSelected }) => (
  <Query query={GET_ARTICLES}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...';
      if (error) return `Error! ${error.message}`;

      return (
        <div>
          <h3>AnotherPage query</h3>
          <select name="article" onChange={onDogSelected}>
            {data.articles.map(article => (
              <option key={article.id} value={article.name}>
                {article.name}
              </option>
            ))}
          </select>
        </div>
      );
    }}
  </Query>
);

export default AnotherPage;
