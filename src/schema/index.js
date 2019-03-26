import { makeExecutableSchema } from 'graphql-tools';

import UserSchema from './User/schema';

import MutationsSchema from './Mutations/schema';
import QuerySchema from './Query/schema';

import { User } from './User/resolver';
import { Article } from './Article/resolver';
import { Mutation } from './Mutations/resolver';
import { Query } from './Query/resolver';

module.exports = makeExecutableSchema({
  typeDefs: [QuerySchema, MutationsSchema, UserSchema],
  // resolvers: { ...Query, ...Mutation, ...User },
  resolvers: { ...Query, ...User, ...Article },
});
