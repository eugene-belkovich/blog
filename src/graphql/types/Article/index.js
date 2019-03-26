export default `
  type Article {
    id: String!
    name: String!
  }
  type Query {
    article(id: String!): Article
    articles: [Article]
  }
  type Mutation {
    addArticle(id: String!, name: String!): Article
    editArticle(id: String, name: String): Article
    deleteArticle(id: String, name: String): Article
  }
`;
