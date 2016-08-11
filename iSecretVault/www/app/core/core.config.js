(function() {
  'use strict';

  angular
    .module('ipmApp.core.config', [
      'ionic',
      'pascalprecht.translate'
    ])
  // angular-translate
  .config(function($translateProvider) {
    $translateProvider
      .useSanitizeValueStrategy('escaped')
      .useLoader('$translatePartialLoader', {
        urlTemplate: 'i18n/{part}/{lang}.json'
      })
      .preferredLanguage('en');
  });
})();
