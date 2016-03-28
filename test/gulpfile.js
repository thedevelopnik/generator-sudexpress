/**
 * Module Dependencies
 */

var browserify = require('browserify');
var gulp = require('gulp');
var babel = require('gulp-babel');
var jshint = require('gulp-jshint');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var nodemon = require('gulp-nodemon');
var connect = require('gulp-connect');
var cleanCSS = require('gulp-clean-css');
var clean = require('gulp-rimraf');
var concat = require('gulp-concat');
var runSequence = require('run-sequence');
var sass = require('gulp-sass');
var Promise = require('bluebird');
var source = require('vinyl-source-stream');


/**
 * Bourbon & Neat
 */

var bourbonPaths = require('bourbon').includePaths;
var neatPaths = require('bourbon-neat').includePaths;

/**
 * Config
 */

 var paths = {
   css: './src/client/styles/**/*.css',
   scss: ['./src/client/styles/scss/*.scss',
          './src/client/styles/scss/**/*.scss'],
   scripts: './src/client/js/*.js',
   server: './src/server/bin/www',
   distServer: './dist/server/bin/www',
 };

var nodemonConfig = {
  script: paths.server,
  ext: 'html js css',
  ignore: ['node_modules']
};

var nodemonDistConfig = {
  script: paths.distServer,
  ext: 'html js css',
  ignore: ['node_modules']
};


/**
 * Gulp Tasks
 */

gulp.task('babel', function () {
	return gulp.src('./src/client/js/bundle.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('./dist/client/js/'));
});

gulp.task('browserify', function() {
  var brify = browserify('./src/client/js/main.js');
  brify.bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./src/client/js/'));
});

gulp.task('lint', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('browser-sync', ['nodemon'], function(done) {
  browserSync({
    proxy: "localhost:3000",  // local node app address
    port: 5000,  // use *different* port than above
    notify: true
  }, done);
});

gulp.task('nodemon', function (cb) {
  var called = false;
  return nodemon(nodemonConfig)
  .on('start', function () {
    if (!called) {
      called = true;
      cb();
    }
  })
  .on('restart', function () {
    setTimeout(function () {
      reload({ stream: false });
    }, 1000);
  });
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['lint']);
});

gulp.task('clean', function() {
  return gulp.src('./dist/*')
    .pipe(clean({force: true}));
});

gulp.task('sass', function () {
  return gulp.src(paths.scss)
    .pipe(sass({
      includePaths: ['styles'].concat(bourbonPaths, neatPaths)
    }).on('error', sass.logError))
    .pipe(gulp.dest('./src/client/styles/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch(paths.scss[1], ['sass']);
});

gulp.task('minify-css', function() {
  var opts = {keepSpecialComments:'*'};
  return gulp.src(paths.styles)
    .pipe(cleanCSS(opts))
    .pipe(gulp.dest('./dist/client/css/'));
});

gulp.task('copy-server-files', function () {
  gulp.src('./src/server/**/*')
    .pipe(gulp.dest('./dist/server/'));
});


gulp.task('connectDist', function (cb) {
  var called = false;
  return nodemon(nodemonDistConfig)
  .on('start', function () {
    if (!called) {
      called = true;
      cb();
    }
  })
  .on('restart', function () {
    setTimeout(function () {
      reload({ stream: false });
    }, 1000);
  });
});


// *** default task *** //
gulp.task('default', ['browser-sync', 'watch'], function(){});

// *** build task *** //
gulp.task('build', function() {
  runSequence(
    'clean',
    'lint',
    'browserify',
    'babel',
    'minify-css',
    'copy-server-files');
});
