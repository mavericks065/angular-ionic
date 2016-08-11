(function() {
  'use strict';

  angular
    .module('ipmApp.core.route', [
      'pascalprecht.translate',

      'ipmApp.core.constants',
      'ipmApp.authentication',
      'ipmApp.vault',
      'ipmApp.categories',
      'ipmApp.settings',
      'ipmApp.passwords',
      'ipmApp.authentication.signup',
      'ipmApp.core.firebase.service'
    ])
    .config(configRoute)
    .run(initRoute);

  function configRoute($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('authentication', {
        url: '/authentication',
        onEnter: function($translatePartialLoader) {
          $translatePartialLoader.addPart('authentication');
        },
        views: {
          '': {
            template: '<authentication></authentication>'
          }
        }
      })
      .state('signup', {
        url: '/signup',
        onEnter: function($translatePartialLoader) {
          $translatePartialLoader.addPart('authentication/signup');
        },
        views: {
          '': {
            template: '<authentication-signup></authentication-signup>'
          }
        }
      })
      .state('locked', {
        url: '/locked',
        cache: false,
        onEnter: function($translatePartialLoader) {
          $translatePartialLoader.addPart('vault/vault-unlock');
        },
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
        onEnter: function($translatePartialLoader) {
          $translatePartialLoader.addPart('vault/vault-create');
        },
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
        url: '/categories',
        cache: false,
        onEnter: function($translatePartialLoader) {
          $translatePartialLoader.addPart('categories');
        },
        views: {
          'tab-categories': {
            template: '<categories></categories>'
          }
        }
      })
      .state('tab.settings', {
        url: '/settings',
        cache: false,
        onEnter: function($translatePartialLoader) {
          $translatePartialLoader.addPart('settings');
        },
        views: {
          'tab-settings': {
            template: '<settings></settings>'
          }
        }
      })
      .state('settingsLoginPwd', {
        url: '/settings/:userId/loginPassword',
        cache: false,
        onEnter: function($translatePartialLoader) {
          $translatePartialLoader.addPart('settings/settings-login-password');
        },
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
        onEnter: function($translatePartialLoader) {
          $translatePartialLoader.addPart('settings/settings-vault');
        },
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
        url: '/categories/:categoryId/passwords',
        cache: false,
        onEnter: function($translatePartialLoader) {
          $translatePartialLoader.addPart('passwords/password-list');
        },
        resolve: {
          categoryId: function($stateParams) {
            return $stateParams.categoryId;
          }
        },
        views: {
          '': {
            template: [
              '<password-list ',
              'category-id="pwdListCtrl.categoryId"',
              '></password-list>'].join(''),
            controller: function(categoryId) {
              var vm = this;
              vm.categoryId = categoryId;
            },
            controllerAs: 'pwdListCtrl'
          }
        }
      })
      .state('newpassword', {
        url: '/categories/:categoryId/passwords',
        onEnter: function($translatePartialLoader) {
          $translatePartialLoader.addPart('passwords/password-display');
        },
        resolve: {
          categoryId: function($stateParams) {
            return $stateParams.categoryId;
          }
        },
        views: {
          '': {
            template: [
              '<password-form category-id="createPwdCtrl.categoryId"',
              'mode="editPwdCtrl.mode"></password-form>'].join(' '),
            controller: function(PasswordsConstants, categoryId) {
              var vm = this;
              vm.categoryId = categoryId;
              vm.mode = PasswordsConstants.MODE.CREATE;
            },
            controllerAs: 'createPwdCtrl'
          }
        }
      })
      .state('editpassword', {
        url: '/categories/:categoryId/passwords/:passwordId',
        onEnter: function($translatePartialLoader) {
          $translatePartialLoader.addPart('passwords/password-form');
        },
        resolve: {
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
              '<password-form category-id="editPwdCtrl.categoryId"',
              'password-id="editPwdCtrl.passwordId"',
              'mode="editPwdCtrl.mode">',
              '</password-form>'].join(' '),
            controller: function($scope, $state, FirebaseService, $cipherFactory,
              PasswordsConstants, categoryId, passwordId) {

              var vm = this;
              vm.categoryId = categoryId;
              vm.passwordId = passwordId;
              vm.mode = PasswordsConstants.MODE.UPDATE;
            },
            controllerAs: 'editPwdCtrl'
          }
        }
      })
      .state('viewpassword', {
        url: '/categories/:categoryId/passwords/:passwordId',
        cache: false,
        onEnter: function($translatePartialLoader) {
          $translatePartialLoader.addPart('passwords/password-display');
        },
        resolve: {
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
              '<password-display category-id="viewPwdCtrl.categoryId"',
              'password-id="viewPwdCtrl.passwordId">',
              '</password-display>'].join(' '),
            controller: function(categoryId, passwordId) {
              var vm = this;
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
