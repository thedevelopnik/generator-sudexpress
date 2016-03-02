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
    this.copy('./src/client/css/main.css', './src/client/css/main.css');
    this.copy('./src/server/bin/www', './src/server/bin/www');
    this.copy('./src/server/routes/index.js', './src/server/routes/index.js');
    this.copy('./src/server/views/error.html', './src/server/views/error.html');
    this.copy('./src/server/views/index.html', './src/server/views/index.html');
    this.copy('./src/server/views/layout.html', './src/server/views/layout.html');
    this.copy('./src/server/app.js', './src/server/app.js');
    this.copy('package.json');
    this.copy('_gitignore', '.gitignore');
    this.copy('gulpfile.js', 'gulpfile.js');
    this.copy('./test/tests.spec.js', './test/tests.spec.js');
    this.copy('./src/server/knex.js', './src/server/knex.js');
    this.copy('./src/server/knexfile.js', './src/server/knexfile.js');
  },

});

module.exports = SudexpressGenerator;
