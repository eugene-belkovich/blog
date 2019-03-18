require('dotenv').config();

if (!process.env.PORT) {
  throw new Error('Missing PORT');
}

const config = {
  PORT: process.env.PORT,
};

module.exports.config = config;
