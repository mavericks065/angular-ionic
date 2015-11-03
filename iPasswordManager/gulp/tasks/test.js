var gulp = require('gulp');
var wiredep = require('wiredep').stream;
var inject = require('gulp-inject');
var karma = require('karma').server;
var config = require('../gulp.config')();
var paths = config.paths;

gulp.task('test', function (done) {

  gulp.src(paths.karma)
    .pipe(wiredep({
      exclude: ['angular.js', 'ionic.js'],
      devDependencies: true,
      fileTypes: {
        js: {
          block: /(([\s\t]*)\/{2}\s*?bower:\s*?(\S*))(\n|\r|.)*?(\/{2}\s*endbower)/gi,
          detect: {
            js: /'(.*\.js)'/gi
          },
          replace: {
            js: '\'{{filePath}}\','
          }
        }
      }
    }))
    .pipe(inject(gulp.src(paths.js.concat(paths.test), {read: false}), {
      starttag: '// inject:js',
      endtag: '// endinject',
      transform: function (filepath, file, i, length) {
        return '\'' + filepath.substring(1, filepath.length) + '\'' +
          (i + 1 < length ? ',' : '');
      }
    }))
    .pipe(gulp.dest('./'))
    .on('end', function() {
      karma.start({
        configFile: __dirname + '/../../karma.conf.js',
        singleRun: true
      }, function() {
        done();
      });
    });
});