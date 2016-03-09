module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DEV_DB
  },

  production: {
    client: 'pg',
    connection: process.env.PROD_DB + '?ssl=true'
  }
};
