var gulp = require('gulp');
var plato = require('plato');
var config = require('../gulp.config')();
var paths = config.paths;

gulp.task('plato', function(done) {
  startPlatoVisualizer(done);
});

/**
 * Start Plato inspector and visualizer
 */
function startPlatoVisualizer(done) {
  var files = paths.js;
  var excludeFiles = /.*\.spec\.js/;
  var plato = require('plato');

  var options = {
    title: 'Plato Inspections Report',
    exclude: excludeFiles
  };
  var outputDir = paths.report + '/plato';

  plato.inspect(files, outputDir, options, platoCompleted);

  function platoCompleted(report) {
    var overview = plato.getOverviewReport(report);
    if (done) {
      done();
    }
  }
}