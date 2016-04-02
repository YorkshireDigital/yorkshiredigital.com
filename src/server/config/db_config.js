/* global DATABASE_NAME, DATABASE_USER, DATABASE_PASSWORD, DATABASE_HOST */

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
  staging: {
    database: process.env.DATABASE_NAME,
    user: process.env.DATABASE_USER,
    pass: process.env.DATABASE_PASSWORD,
    dialect: 'mysql',
    host: process.env.DATABASE_HOST,
    port: 3306,
    models: 'src/server/schema/**/*.js'
  }
};

const env = process.env.NODE_ENV || 'development';
console.log('NODE_ENV => ', process.env.NODE_ENV);
console.log('DB_CONFIG 👾=> ', dbConfig[env]);

module.exports = dbConfig[env];
