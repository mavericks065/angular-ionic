(function() {
  'use strict';

  angular
    .module('ipmApp.settings.loginPassword.component', [
      'ionic'
    ])
    .component('settingsLoginPassword', settingsLoginPassword());

  function settingsLoginPassword() {
    var component = {
      templateUrl: 'app/settings/settings-login-password/settings-login-password.view.html',
      bindings: {
        userId: '<'
      },
      controller: SettingsLoginPasswordController
    };
    return component;
  }

  function SettingsLoginPasswordController($ionicHistory) {
    var vm = this;

    vm.back = back;
    vm.updatePassword = updatePassword;

    // internal functions

    function back() {
      $ionicHistory.goBack();
    }

    function updatePassword() {

    }
  }
})();
