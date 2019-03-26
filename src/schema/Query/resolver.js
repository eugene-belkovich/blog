const Query = {
  Query: {
    allUsers: async (root, data, { mongo: { Users } }) => {
      return await Users.find({}).toArray();
    },
    allArticles: async (root, data, { mongo: { Articles } }) => {
      return await Articles.find({}).toArray();
    },
  },
};

export { Query };
