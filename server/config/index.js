const mongoURI = 'mongodb://localhost:27017/bucket-list';
const JWT_KEY = 'randomkey';
const config = {
  development: {
    mongoURI,
    port: 3000,
    JWT_KEY
  },
  production: {
    mongoURI: process.env.MONGO_URI || mongoURI,
    port: process.env.PORT || 8000,
    JWT_KEY: process.env.JWT_KEY || JWT_KEY
  }
};

const env = process.env.NODE_ENV;

module.exports = config[env] ? config[env] : config['development'];
