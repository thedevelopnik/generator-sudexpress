var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');

var SudexpressGenerator = yeoman.Base.extend({

  promptUser: function() {
    // greeting
    console.log(chalk.magenta("Welcome to Dave Sudia's Node/Express Generator"));
  },

  createApp: function(){
    this.copy('./src/client/js/main.js', './src/client/js/main.js');
    this.copy('./src/client/js/bundle.js', './src/client/js/bundle.js');
    this.copy('./src/client/styles/css/main.css', './src/client/styles/css/main.css');
    this.copy('./src/client/styles/scss/main.scss', './src/client/styles/scss/main.scss');
    this.copy('./src/server/bin/www', './src/server/bin/www');
    this.copy('./src/server/routes/index.js', './src/server/routes/index.js');
    this.copy('./src/server/views/error.html', './src/server/views/error.html');
    this.copy('./src/server/views/index.html', './src/server/views/index.html');
    this.copy('./src/server/views/layout.html', './src/server/views/layout.html');
    this.copy('./src/server/app.js', './src/server/app.js');
    this.copy('package.json');
    this.copy('.env', '.env');
    this.copy('_gitignore', '.gitignore');
    this.copy('gulpfile.js', 'gulpfile.js');
    this.copy('./test/clientTests.spec.js', './test/clientTests.spec.js');
    this.copy('./test/serverTests.spec.js', './test/serverTests.spec.js');
    this.copy('./test/index.html', './test/index.html');
    this.copy('./db/knex.js', './db/knex.js');
    this.copy('knexfile.js', 'knexfile.js');
    this.copy('./.env', './.env');
    this.copy('./src/server/lib/helpers.js', './src/server/lib/helpers.js');
    this.copy('./src/server/lib/passport.js', './src/server/lib/passport.js');
  },

});

module.exports = SudexpressGenerator;
