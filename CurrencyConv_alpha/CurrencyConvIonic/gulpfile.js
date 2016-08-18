var gulp = require('gulp');
var gutil = require('gulp-util');
var watch = require('gulp-watch');
var bower = require('bower');
var concat = require('gulp-concat');
var sh = require('shelljs');
var requireDir = require('require-dir');
var config = require('./gulp/gulp.config')();
var paths = config.paths;

requireDir('./gulp/tasks');

gulp.task('default', ['sass', 'index', 'jshint', 'jscs', 'htmlhint']);

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
  gulp.watch(paths.js, ['index', 'jshint', 'jscs']);
  gulp.watch(paths.html, ['htmlhint']);
});

gulp.task('install', ['git-check'], function() {
  return bower.commands.install()
    .on('log', function(data) {
      gutil.log('bower', gutil.colors.cyan(data.id), data.message);
    });
});

gulp.task('git-check', function(done) {
  if (!sh.which('git')) {
    console.log(
      '  ' + gutil.colors.red('Git is not installed.'),
      '\n  Git, the version control system, is required to download Ionic.',
      '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
      '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
    );
    process.exit(1);
  }
  done();
});
