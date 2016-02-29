/**
 * Module Dependencies
 */

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
var Promise = require('bluebird');


/**
 * Config
 */

var paths = {
  styles: [
    './src/client/css/*.css',
  ],
  scripts: [
    './src/client/js/*.js',
  ],
  server: [
    './src/server/bin/www'
  ],
  distServer: [
    './dist/server/bin/www'
  ]
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
	return gulp.src('src/client/js/build.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('./dist/client/js/'));
});

gulp.task('browserify', function() {
  return browserify('./src/client/js/main.js')
    .bundle()
    //Pass desired output filename to vinyl-source-stream
    .pipe(source('./src/client/js/bundle.js'));
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
    ['clean'],
    ['lint', 'browserify', 'babel', 'minify-css', 'copy-server-files', 'connectDist']
  );
});
