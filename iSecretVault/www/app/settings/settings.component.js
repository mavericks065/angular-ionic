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

  function SettingsController($state, AuthenticationService) {
    var vm = this;

    vm.signOut = signOut;

    // internal functions

    function signOut() {
      AuthenticationService.signOut();
      $state.go('authentication');
    }
  }
})();
