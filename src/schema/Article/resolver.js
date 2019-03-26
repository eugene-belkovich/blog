const Article = {
  Article: {
    id: root => {
      const db = require('../../mongo-connector');

      var articles = db.collection('articles').find();
      console.log('articles', articles);
      return ['1 test', '2 test', '3 test'];
    },
  },
};

export { Article };
