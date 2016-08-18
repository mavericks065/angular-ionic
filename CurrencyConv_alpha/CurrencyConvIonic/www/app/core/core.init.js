(function() {
  'use strict';

  angular
    .module('ccApp.core.init', [
      'pascalprecht.translate'
    ])
  // angular-translate
  .run(function($rootScope, $translate) {
    $rootScope.$on('$translatePartialLoaderStructureChanged', function() {
      $translate.refresh();
    });
  });
})();