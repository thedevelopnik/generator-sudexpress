module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost:5432/YOUR_DATABASE'
  },

  production: {
    client: 'pg',
    connection: 'postgres://'
  }
};
