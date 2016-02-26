var express = require('express');
var router = express.Router();
var pg = require('pg');
var escape = require('pg-escape');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
