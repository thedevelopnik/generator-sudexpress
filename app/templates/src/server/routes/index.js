var express = require('express');
var router = express.Router();
var pg = require('pg');
var escape = require('pg-escape');
var pgp = require('pg-promise');
require('dotenv').config();
connectionstring = process.env.DB_URL;

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
