var gulp = require('gulp');
var htmlhint = require('gulp-htmlhint');
var config = require('../gulp.config')();
var paths = config.paths;

gulp.task('htmlhint', function() {
  return gulp.src(paths.html)
      .pipe(htmlhint({
        htmlhintrc: '.htmlhintrc'
      }))
      .pipe(htmlhint.reporter());
});