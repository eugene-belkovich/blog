import User from '../User/schema';
import Article from '../Article/schema';

const Query = `
  type Query {
    allUsers: [User!]!
    allArticles: [Article!]!
    me: User!
  }
`;

export default () => [Query, User, Article];
