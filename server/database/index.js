const mongoose = require('mongoose');
const logger = require('../logger');

class Database {
  /**
   * Connect to Mongodb Database
   * @param {String} url - Mongodb uri to connect to database
   */
  async connect(url) {
    try {
      await mongoose.connect(url, {
        useNewUrlParser: true
      });
      logger.log('Database connection was successful');
    } catch (error) {
      logger.error(error.message);
      throw error;
    }
  }
}

module.exports = new Database();
