const User = {
  User: {
    id: root => {
      return root._id || root.id;
    },
  },
};

export { User };
