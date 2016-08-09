(function() {
  'use strict';

  angular
    .module('ipmApp.settings.vault.component', [
      'ionic',
      'ipmApp.vault.service',
      'ipmApp.settings.service'
    ])
    .component('settingsVault', settingsVault());

  function settingsVault() {
    var component = {
      templateUrl: 'app/settings/settings-vault/settings-vault.view.html',
      bindings: {
        userId: '<'
      },
      controller: SettingsVaultController
    };
    return component;
  }

  function SettingsVaultController($state, $ionicHistory, $ionicPopup, $cipherFactory,
    FirebaseService, VaultService, SettingsService) {
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
          vm.updateMasterCode = updateMasterCode;
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

    function updateMasterCode() {
      var storedMasterCode = VaultService.getMasterCode();
      if (storedMasterCode !== vm.masterCodeInput) {
        $ionicPopup.alert({
          title: 'Master password incorrect',
          template: 'Please enter the good master password'
        });
      } else if (vm.newMasterCodeInput !== vm.newMasterCodeConfirmationInput) {
        $ionicPopup.alert({
          title: 'Master password confirmation failed',
          template: 'Please re-enter the password and its confirmation.'
        });
      } else {
        SettingsService.updateMasterCode(FirebaseService.getUserReference(vm.user.uid),
          $cipherFactory.encrypt('Authenticated', vm.newMasterCodeInput));
        VaultService.storeMasterCode(vm.newMasterCodeInput);
        $state.go('tab.settings');
      }
    }
  }
})();
