var gulp = require('gulp');
var jscs = require('gulp-jscs');
var notify = require('gulp-notify');
var config = require('../gulp.config')();
var paths = config.paths;

gulp.task('jscs', function() {
  return gulp.src(paths.js)
    .pipe(jscs())
    .on('error', notify.onError({
      title : 'JSCS error(s)',
      message : '<%= error.message %>'
    }));
});