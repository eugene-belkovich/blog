require('dotenv').config();

if (!process.env.PORT) {
  throw new Error('Missing PORT');
}
if (!process.env.MONGODB_URI) {
  throw new Error('Missing MONGODB_URI');
}

const config = {
  PORT: process.env.PORT,
  MONGOURL: process.env.MONGODB_URI,
};

module.exports.config = config;
