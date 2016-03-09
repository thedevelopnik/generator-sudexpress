var environment = 'development' || 'production';
var config = require('../knexfile')[environment];
module.exports = require('knex')(config);
