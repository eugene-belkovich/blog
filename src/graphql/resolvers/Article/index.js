import Article from '../../../models/Article';

export default {
  Query: {
    article: (root, args) => {
      return new Promise((resolve, reject) => {
        Article.findOne(args).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    articles: () => {
      return new Promise((resolve, reject) => {
        Article.find({})
          .populate()
          .exec((err, res) => {
            err ? reject(err) : resolve(res);
          });
      });
    },
  },
  Mutation: {
    addArticle: (root, { id, name }) => {
      const newarticle = new Article({ id, name });

      return new Promise((resolve, reject) => {
        newarticle.save((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
    editArticle: (root, { id, name }) => {
      return new Promise((resolve, reject) => {
        Article.findOneAndUpdate({ id }, { $set: { name } }).exec(
          (err, res) => {
            err ? reject(err) : resolve(res);
          }
        );
      });
    },
    deleteArticle: (root, args) => {
      return new Promise((resolve, reject) => {
        Article.findOneAndRemove(args).exec((err, res) => {
          err ? reject(err) : resolve(res);
        });
      });
    },
  },
};
