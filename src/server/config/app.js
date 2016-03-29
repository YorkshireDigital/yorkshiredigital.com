const config = {
  development: {
    host: 'localhost',
    port: 8000,
    routes: { cors: true },
    secretKey: 'so74565467rs3cr3t132189328213213n123123dasd12341239i0dsf'
  },
  test: {
  }
};

const env = process.env.NODE_ENV || 'development';
module.exports = config[env];
