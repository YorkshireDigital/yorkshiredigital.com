const config = {
  development: {
    baseUri: 'http://localhost:8000/'
  },
  test: {
  }
};

const env = process.env.NODE_ENV || 'development';
module.exports = config[env];
