(function() {
  'use strict';

  angular
    .module('ipmApp.core.route', [
      'ipmApp.authentication',
      'ipmApp.vault',
      'ipmApp.categories',
      'ipmApp.passwords',
      'ipmApp.core.firebase.service'
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
          resolve: {
            masterPassword: function($stateParams) {
              return $stateParams.masterPassword;
            }
          },
          views: {
            'tab-categories': {
              template: '<categories master-password="categoryCtrl.masterPassword"></categories>',
              controller: function(masterPassword) {
                var vm = this;
                vm.masterPassword = masterPassword;
              },
              controllerAs: 'categoryCtrl'
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
          resolve: {
            masterPassword: function($stateParams) {
              return $stateParams.masterPassword;
            },
            categoryId: function($stateParams) {
              return $stateParams.categoryId;
            }
          },
          views: {
            '': {
              template: [
                '<password-list master-password="pwdListCtrl.masterPassword"',
                'category-id="pwdListCtrl.categoryId"></password-list>'].join(' '),
              controller: function(masterPassword, categoryId) {
                var vm = this;
                vm.masterPassword = masterPassword;
                vm.categoryId = categoryId;
              },
              controllerAs: 'pwdListCtrl'
            }
          }
        })
        .state('newpassword', {
          url: '/newpassword/:categoryId/:masterPassword',
          resolve: {
            masterPassword: function($stateParams) {
              return $stateParams.masterPassword;
            },
            categoryId: function($stateParams) {
              return $stateParams.categoryId;
            }
          },
          views: {
            '': {
              template: [
                '<password-form master-password="createPwdCtrl.masterPassword"',
                'category-id="createPwdCtrl.categoryId"',
                'mode="editPwdCtrl.mode"></password-form>'].join(' '),
              controller: function(PasswordsConstants, masterPassword, categoryId) {
                var vm = this;
                vm.masterPassword = masterPassword;
                vm.categoryId = categoryId;
                vm.mode = PasswordsConstants.MODE.CREATE;
              },
              controllerAs: 'createPwdCtrl'
            }
          }
        })
        .state('editpassword', {
          url: '/editpassword/:categoryId/:masterPassword/:passwordId',
          resolve: {
            masterPassword: function($stateParams) {
              return $stateParams.masterPassword;
            },
            categoryId: function($stateParams) {
              return $stateParams.categoryId;
            },
            passwordId: function($stateParams) {
              return $stateParams.passwordId;
            }
          },
          views: {
            '': {
              template:  [
                '<password-form master-password="editPwdCtrl.masterPassword"',
                'category-id="editPwdCtrl.categoryId"',
                'password-id="editPwdCtrl.passwordId"',
                'mode="editPwdCtrl.mode">',
                '</password-form>'].join(' '),
              controller: function($scope, $state, FirebaseService, $cipherFactory,
                PasswordsConstants, masterPassword, categoryId, passwordId) {

                var vm = this;
                vm.masterPassword = masterPassword;
                vm.categoryId = categoryId;
                vm.passwordId = passwordId;
                vm.mode = PasswordsConstants.MODE.UPDATE;
              },
              controllerAs: 'editPwdCtrl'
            }
          }
        })
        .state('viewpassword', {
          url: '/viewpassword/:categoryId/:masterPassword/:passwordId',
          cache: false,
          resolve: {
            masterPassword: function($stateParams) {
              return $stateParams.masterPassword;
            },
            categoryId: function($stateParams) {
              return $stateParams.categoryId;
            },
            passwordId: function($stateParams) {
              return $stateParams.passwordId;
            }
          },
          views: {
            '': {
              template:  [
                '<password-display master-password="viewPwdCtrl.masterPassword"',
                'category-id="viewPwdCtrl.categoryId" password-id="viewPwdCtrl.passwordId">',
                '</password-display>'].join(' '),
              controller: function(masterPassword, categoryId, passwordId) {
                var vm = this;
                vm.masterPassword = masterPassword;
                vm.categoryId = categoryId;
                vm.passwordId = passwordId;
              },
              controllerAs: 'viewPwdCtrl'
            }
          }
        });
      $urlRouterProvider.otherwise('/locked');
    });
})();
