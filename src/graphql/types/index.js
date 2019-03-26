import { mergeTypes } from 'merge-graphql-schemas';

import Article from './Article/';

const typeDefs = [Article];

export default mergeTypes(typeDefs, { all: true });
