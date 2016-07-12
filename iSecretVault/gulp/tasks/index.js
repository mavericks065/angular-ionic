var gulp = require('gulp');
var wiredep = require('wiredep').stream;
var inject = require('gulp-inject');
var config = require('../gulp.config')();
var paths = config.paths;

gulp.task('index', function () {
  return gulp.src(paths.index)
    .pipe(wiredep({
      exclude: ['angular.js']
    }))
    .pipe(inject(gulp.src(paths.js, {read: false}), {relative: true}))
    .pipe(gulp.dest(paths.app));
});