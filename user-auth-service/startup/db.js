const { logger } = require('../startup/Logger/winston');
const mongoose = require('mongoose');

const connectDB = async() => {
  return mongoose.connect('mongodb://localhost/user_auth_db', {
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
