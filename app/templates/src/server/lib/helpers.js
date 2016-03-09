var bcrypt = require('bcrypt');
var Promise = require('bluebird');
Promise.promisifyAll(bcrypt);

module.exports = {
  ensureAuthenticated: function(req, res, next) {
    // check if user is authenticated
    if(req.user) {
      // if so -> call next()
      return next();
    } else {
      // if not -> redirect to login
      return res.redirect('/login');
    }
  },

  loginRedirect: function(req, res, next) {
    // check if user is authenticated
    if(req.user) {
      // if so -> redirect to main route
      return res.redirect('/');
    } else {
      // if not -> call next()
      return next();
    }
  },

  hashString: function(string) {
    return bcrypt.hash(string, 10, function(err, hash) {
      return hash;
    }).then(function(hashedString) {
      return hashedString;
    }).catch(function(err) {
      return 'Hashing process failed: ' + err;
    });
  },

  checkPassword: function (pass, hashedPass) {
    return new Promise(function(resolve, reject) {
      bcrypt.compare(password, hashed, function(error, result) {
        if (error) {
          reject('Passwords do not match');
        } else {
          resolve(result);
        }
      });
    });
  },

  comparePassword: function (pass, hashedPass) {
    if (pass === hashedPass) {
      return true;
    } else {
      return false;
    }
  }
};
