(function() {
  'use strict';

  angular
    .module('ipmApp.settings.loginPassword.component', [
      'ionic',
      'ipmApp.vault.service'
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

  function SettingsLoginPasswordController($state, $ionicHistory, $ionicPopup,
    FirebaseService, VaultService) {
    var vm = this;
    var unregister;

    vm.$onInit = init;
    vm.$onDestroy = destroy;

    // internal functions

    function init() {
      unregister = FirebaseService.getAuth().onAuthStateChanged(function(user) {
        if (user) {
          vm.user = user;
          vm.back = back;
          vm.updatePassword = updatePassword;
        } else {
          $state.go('authentication');
        }
      });
    }

    function destroy() {
      unregister();
    }

    function back() {
      $ionicHistory.goBack();
    }

    function updatePassword() {
      var storedMasterPassword = VaultService.getMasterPassword();
      if (storedMasterPassword !== vm.masterPasswordInput) {
        $ionicPopup.alert({
          title: 'Master password incorrect',
          template: 'Please enter the good master password'
        });
      } else if (vm.newPasswordInput !== vm.newPasswordConfirmationInput) {
        $ionicPopup.alert({
          title: 'Password confirmation failed',
          template: 'Please re-enter the password and its confirmation.'
        });
      } else {
        vm.user.updatePassword(vm.newPasswordInput).then(function() {
          $state.go('tab.settings');
        }, function(error) {
          console.log(error);
        });
      }
    }
  }
})();
