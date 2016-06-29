(function() {
  'use strict';

  angular
    .module('ipmApp.core.route', [
      'ipmApp.authentication',
      'ipmApp.vault',
      'ipmApp.categories',
      'ipmApp.passwords'
    ])
    .config(function($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('authentication', {
          url: '/authentication',
          views: {
            '': {
              template: '<authentication></authentication>'
            }
          }
        })
        .state('tab', {
          url: '/tab',
          abstract: true,
          templateUrl: 'app/core/core.view.html'
        })
        .state('locked', {
          url: '/locked',
          cache: false,
          views: {
            '': {
              template: '<vault mode="unlockVaultCtrl.VaultConstants.MODE.UNLOCK"></vault>',
              controller: function(VaultConstants) {
                var vm = this;
                vm.VaultConstants = VaultConstants;
              },
              controllerAs: 'unlockVaultCtrl'
            }
          }
        })
        .state('createvault', {
          url: '/createvault',
          views: {
            '': {
              template: '<vault mode="createVaultCtrl.VaultConstants.MODE.CREATE"></vault>',
              controller: function(VaultConstants) {
                var vm = this;
                vm.VaultConstants = VaultConstants;
              },
              controllerAs: 'createVaultCtrl'
            }
          }
        })
        .state('tab.categories', {
          url: '/categories/:masterPassword',
          views: {
            'tab-categories': {
              template: '<categories></categories>'
            }
          }
        })
        .state('tab.parameters', {
          url: '/parameters/:masterPassword',
          views: {
            'tab-parameters': {
              templateUrl: 'app/parameters/parameters.view.html',
              controller: 'ParameterController as parameterCtrl'
            }
          }
        })
        .state('passwords', {
          url: '/passwords/:categoryId/:masterPassword',
          cache: false,
          views: {
            '': {
              template: '<password-list></password-list>'
            }
          }
        })
        .state('newpassword', {
          url: '/newpassword/:categoryId/:masterPassword',
          views: {
            '': {
              template: '<password-form></password-form>'
            }
          }
        })
        // .state('editpassword', {
        //   url: '/editpassword/:categoryId/:masterPassword/:passwordId',
        //   templateUrl: 'app/passwords/password-new.view.html',
        //   controller: 'PasswordController as passwordCtrl'
        // })
        .state('viewpassword', {
          url: '/viewpassword/:categoryId/:masterPassword/:passwordId',
          views: {
            '': {
              template: '<password-display></password-display>',
              // controller: function($stateParams) {
              //   this.categoryId =
              // }
            }
          }
        });
      $urlRouterProvider.otherwise('/locked');
    });
})();
