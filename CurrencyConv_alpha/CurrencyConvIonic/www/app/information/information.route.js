(function() {
  'use strict';

  angular
    .module('ccApp.information.route', [
      'pascalprecht.translate'
    ])
    .config(function($stateProvider) {

      $stateProvider
        .state('tab.information', {
          url: '/information',
          onEnter: function($translatePartialLoader) {
            $translatePartialLoader.addPart('information');
          },
          views: {
            'tab-information': {
              templateUrl: 'app/information/information.view.html'
            }
          }
        });
    });
})();