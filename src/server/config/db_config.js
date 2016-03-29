const dbConfig = {
  development: {
    database: 'yorkshire_digital',
    user: 'yd-admin',
    pass: 'qkePUs9xuuM8gNkj',
    dialect: 'mysql',
    host: '192.168.99.100',
    port: 3306,
    models: 'src/server/schema/**/*.js'
  },
  test: {
  },
  production: {
  }
};

const env = process.env.NODE_ENV || 'development';
module.exports = dbConfig[env];
