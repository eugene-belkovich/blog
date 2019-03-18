const Query = {
  Query: {
    allUsers: async (root, data) => {
      // 1
      return await Users.find({}).toArray(); // 2
    },
  },
};

export { Query };
