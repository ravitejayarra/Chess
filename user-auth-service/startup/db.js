const { logger } = require('../startup/Logger/winston');
const mongoose = require('mongoose');

const connectDB = async() => {
  return mongoose.connect('mongodb://127.0.0.1/user_auth_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => {
      console.log('Connected to MongoDB');
      logger.info('Connected to Mongodb')
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });
};

module.exports = connectDB;
