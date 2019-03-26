const { MongoClient, Logger } = require('mongodb');
import mongoose from 'mongoose';

const { config } = require('./config/server');

let db = null;

const MONGO_URL = config.MONGOURL;

const returnDB = db => {
  return {
    Users: db.collection('users'),
  };
};

module.exports = async () => {
  if (db) return returnDB(db);

  db = await MongoClient.connect(MONGO_URL);

  // let logCount = 0;
  // Logger.setCurrentLogger((msg, state) => {
  //   console.log(`MONGO DB REQUEST ${++logCount}: ${msg}`);
  // });
  // Logger.setLevel('debug');
  // Logger.filter('class', ['Cursor']);
  return returnDB(db);
};
