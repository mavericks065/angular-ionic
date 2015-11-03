module.exports = function() {
  return {
    paths: {
      sass: ['scss/**/*.scss', 'scss/**/*.sass'],
      js: ['www/app/**/*.js'],
      html: ['www/**/*.html'],
      report: './report/',
      karma: __dirname + '/../karma.conf.js',
      test: ['test/**/*.js'],
      index: 'www/index.html',
      app: 'www/'
    }
  };
};