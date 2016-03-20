
var bcrypt = require('bcrypt');

function ensureAuthentication(req, res, next) {
  if (req.user) {
    return next();
  } else {
    return res.redirect('/login');
  }
}

function loginRedirect(req, res, next) {
  if (req.user) {
    return res.redirect('/');
  } else {
    return next();
  }
}

function hash(password) {
  return new Promise(function (resolve, reject) {
    bcrypt.hash(password, 10, function (err, hash) {
      if (err) {
        reject(err);
      } else {
        resolve(hash);
      }
    });
  });
}

function checkPassword(password, hashed) {
  return new Promise(function (resolve, reject) {
    bcrypt.compare(password, hashed, function (error, result) {
      if (error) {
        reject('Passwords do not match');
      } else {
        resolve(result);
      }
    });
  });
}

module.exports = {
  ensureAuthentication: ensureAuthentication,
  loginRedirect: loginRedirect,
  hash: hash,
  checkPassword: checkPassword,
};
