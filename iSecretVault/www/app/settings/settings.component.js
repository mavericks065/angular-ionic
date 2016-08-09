(function() {
  'use strict';

  angular
    .module('ipmApp.settings.component', [
      'ionic',
      'ipmApp.authentication.service'
    ])
    .component('settings', settings());

  function settings() {
    var component = {
      templateUrl: 'app/settings/settings.view.html',
      bindings: {
        masterPassword: '<'
      },
      controller: SettingsController
    };
    return component;
  }

  function SettingsController($state, AuthenticationService, FirebaseService) {
    var vm = this;
    var unregister;

    vm.$onInit = init;
    vm.$onDestroy = destroy;

    // internal functions

    function init() {
      unregister = FirebaseService.getAuth().onAuthStateChanged(function(user) {
        if (user) {
          vm.userId = user.uid;
          vm.signOut = signOut;
        } else {
          $state.go('authentication');
        }
      });
    }

    function destroy() {
      unregister();
    }

    function signOut() {
      AuthenticationService.signOut();
      $state.go('authentication');
    }
  }
})();
