import Article from './Article';

const article = async articleId => {
  try {
    const article = await Article.findById(articleId);
    return {
      ...article._doc,
      _id: article.id,
      createdPosts: postMessage.bind(this, article._doc.createdPosts),
    };
  } catch (error) {
    throw error;
  }
};

const transformPost = event => {
  return {
    ...event._doc,
    _id: event.id,
    creator: article.bind(this, event.creator),
  };
};

exports.transformPost = transformPost;
