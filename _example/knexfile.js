module.exports = {
  development: {
    client: 'pg',
    connection: 'postgres://localhost:5432/YOUR_DATABASE'
  },

  deployment: {
    client: 'pg',
    connection: 'postgres://'
  }
};
