import { mergeResolvers } from 'merge-graphql-schemas';

import Article from './Article/';

const resolvers = [Article];

export default mergeResolvers(resolvers);
