if ( !process.env.NODE_ENV ) { require('dotenv').config(); }

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DEV_DB
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
