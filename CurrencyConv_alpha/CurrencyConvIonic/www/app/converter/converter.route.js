(function() {
  'use strict';

  angular
    .module('ccApp.converter.route', [
      'pascalprecht.translate',
      'ccApp.converter.controller'
    ])
    .config(function($stateProvider) {

      $stateProvider
        .state('tab.converter', {
          url: '/converter',
          onEnter: function($translatePartialLoader) {
            $translatePartialLoader.addPart('converter');
          },
          views: {
            'tab-converter': {
              templateUrl: 'app/converter/converter.view.html',
              controller: 'ConverterController as converterCtrl'
            }
          }
        });
    });
})();