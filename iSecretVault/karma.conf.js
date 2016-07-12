module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // base path, that will be used to resolve files and exclude
    basePath: '',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'www/lib/ionic/js/ionic.bundle.js',
      // bower:js
      'www/lib/lodash/lodash.js',
      'www/lib/angular-resource/angular-resource.js',
      'www/lib/angular-lodash/angular-lodash.js',
      'www/lib/ngCordova/dist/ng-cordova.js',
      'www/lib/angular-local-storage/dist/angular-local-storage.js',
      'www/lib/angular-google-maps/dist/angular-google-maps.js',
      'www/lib/angular-translate/angular-translate.js',
      'www/lib/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
      'www/lib/angular-animate/angular-animate.js',
      'www/lib/angular-sanitize/angular-sanitize.js',
      'www/lib/angular-ui-router/release/angular-ui-router.js',
      'www/lib/angular-mocks/angular-mocks.js',
      // endbower

      // inject:js
      'www/app/app.js',
      'www/app/bookmarks/bookmarks.controller.js',
      'www/app/bookmarks/bookmarks.module.js',
      'www/app/bookmarks/bookmarks.route.js',
      'www/app/bookmarks/bookmarks.service.js',
      'www/app/core/controllers.js',
      'www/app/core/core.config.js',
      'www/app/core/core.controller.js',
      'www/app/core/core.module.js',
      'www/app/core/core.route.js',
      'www/app/core/services.js',
      'www/app/guide/guide.config.js',
      'www/app/guide/guide.controller.js',
      'www/app/guide/guide.module.js',
      'www/app/guide/guide.route.js',
      'www/app/guide/guide.service.js',
      'www/app/map/map.config.js',
      'www/app/map/map.module.js',
      'www/app/guide/guide-map/guide-map.directive.js',
      'www/app/guide/guide-menu/guide-menu.directive.js',
      'www/app/guide/guide-pages/guide-pages.directive.js',
      'www/app/guide/guide-panel/guide-pages.directive.js',
      'test/app/guide/guide.config.unit.js',
      'test/app/guide/guide.service.unit.js'
      // endinject
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'PhantomJS'
    ],

    // Which plugins to enable
    plugins: [
      'karma-chrome-launcher',
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-coverage'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: true,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    reporters: ['progress', 'coverage'],

    preprocessors: {
      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      'www/app/**/*.js': ['coverage']
    },

    // optionally, configure the reporter
    coverageReporter: {
      type : 'html',
      dir : 'report/coverage/'
    }

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
