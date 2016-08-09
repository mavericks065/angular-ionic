(function() {
  'use strict';

  angular
    .module('ipmApp.core.route', [
      'ipmApp.authentication',
      'ipmApp.vault',
      'ipmApp.categories',
      'ipmApp.settings',
      'ipmApp.passwords',
      'ipmApp.core.firebase.service'
    ])
    .config(configRoute)
    .run(initRoute);

  function configRoute($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('authentication', {
        url: '/authentication',
        views: {
          '': {
            template: '<authentication></authentication>'
          }
        }
      })
      .state('locked', {
        url: '/locked',
        cache: false,
        views: {
          '': {
            template: [
              '<vault mode="unlockVaultCtrl.VaultConstants.MODE.UNLOCK">',
              '</vault>'
            ].join(''),
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
            template: [
              '<vault mode="createVaultCtrl.VaultConstants.MODE.CREATE">',
              '</vault>'
            ].join(''),
            controller: function(VaultConstants) {
              var vm = this;
              vm.VaultConstants = VaultConstants;
            },
            controllerAs: 'createVaultCtrl'
          }
        }
      })
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'app/core/core.view.html'
      })
      .state('tab.categories', {
        url: '/masterPassword/:masterPassword/categories',
        cache: false,
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
      .state('tab.settings', {
        url: '/settings',
        cache: false,
        views: {
          'tab-settings': {
            template: '<settings></settings>'
          }
        }
      })
      .state('settingsLoginPwd', {
        url: '/settings/:userId/loginPassword',
        cache: false,
        resolve: {
          userId: function($stateParams) {
            return $stateParams.userId;
          }
        },
        views: {
          '': {
            template: [
              '<settings-login-password',
              'user-id="settingsLoginPwdCtrl.userId"></settings-login-password>'
            ].join(' '),
            controller: function(userId) {
              var vm = this;
              vm.userId = userId;
            },
            controllerAs: 'settingsLoginPwdCtrl'
          }
        }
      })
      .state('settingsVault', {
        url: '/settings/:userId/vault',
        cache: false,
        resolve: {
          userId: function($stateParams) {
            return $stateParams.userId;
          }
        },
        views: {
          '': {
            template: [
              '<settings-vault',
              'user-id="settingsVaultCtrl.userId"></settings-vault>'
            ].join(' '),
            controller: function(userId) {
              var vm = this;
              vm.userId = userId;
            },
            controllerAs: 'settingsVaultCtrl'
          }
        }
      })
      .state('passwords', {
        url: '/masterPassword/:masterPassword/categories/:categoryId/passwords',
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
        url: '/masterPassword/:masterPassword/categories/:categoryId/passwords',
        //'/newpassword/:categoryId/:masterPassword',
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
        url: '/masterPassword/:masterPassword/categories/:categoryId/passwords/:passwordId',
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
        url: '/masterPassword/:masterPassword/categories/:categoryId/passwords/:passwordId',
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
  }

  function initRoute($state) {
    $state.go('authentication');
  }
})();
