(function() {
  'use strict';

  angular
    .module('ccApp.core.route', [
      'pascalprecht.translate'
    ])
    .config(function($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise('/tab/converter');

      $stateProvider
        .state('tab', {
          url: '/tab',
          abstract: true,
          onEnter: function($translatePartialLoader) {
            $translatePartialLoader.addPart('core');
          },
          templateUrl: 'app/core/core.view.html'
        });
    });
})();