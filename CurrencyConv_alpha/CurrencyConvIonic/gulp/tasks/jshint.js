var gulp = require('gulp');
var jshint = require('gulp-jshint');
var notify = require('gulp-notify');
var config = require('../gulp.config')();
var paths = config.paths;

gulp.task('jshint', function() {
  console.log(paths.js);
  return gulp.src(paths.js)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(notify(function (file) {
      if (file.jshint.success) {
        // Don't show something if success
        return false;
      }

      var errors = file.jshint.results.map(function (data) {
        if (data.error) {
          return '(' + data.error.line + ':' + data.error.character + ') ' + data.error.reason;
        }
      }).join('\n');
      return file.relative + ' (' + file.jshint.results.length + ' errors)\n' + errors;
    }));
});