var passport = require('passport');
var LocalStrategy = require('passport-local');
var knex = require('../../../db/knex');
var helpers = require('./helpers');


passport.use(new LocalStrategy({
},
  function(username, password, done) {
    knex('users').where('username', username)
      .then(function(data) {
        var user = data[0];
        if (password === user.password) {
          return done(null, user, {message: 'You\'re logged in!'});
        } else {
          return done(null, false, {message: 'Incorrect password.'});
        }
    }).catch(function(err) {
      return done(null, false, {message: 'Incorrect username.'});
    });
  }
));

module.exports = passport;
