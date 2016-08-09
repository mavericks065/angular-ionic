(function() {
  'use strict';

  angular
    .module('ipmApp.vault.unlock', [
      'ionic',
      'firebase',
      'ipmApp.cipher.service',
      'ipmApp.core.firebase.service',
      'ipmApp.core.constants',
      'ipmApp.vault.service'
    ])
    .component('vaultUnlock', vaultUnlock());

  function vaultUnlock() {
    var component = {
      templateUrl: 'app/vault/vault-unlock/vault-unlock.view.html',
      bindings: {
        userReference: '<'
      },
      controller: VaultUnlockController
    };
    return component;
  }

  function VaultUnlockController($scope, $state, $ionicHistory, $cipherFactory,
    VaultService) {

    $ionicHistory.nextViewOptions({
      disableAnimate: true,
      disableBack: true
    });
    $ionicHistory.clearHistory();

    var vm = this;

    vm.unlock = unlock;

    // internal functions

    function unlock(masterCode) {
      vm.userReference.once('value').then(function(snapshot) {
        var userData = snapshot.val();
        var decipherPhrase = $cipherFactory.decrypt(userData.masterPassword.cipherText,
          masterCode, userData.masterPassword.salt, userData.masterPassword.iv,
          {output: 'hex'});
        if (decipherPhrase === 'Authenticated'.toHex()) {
          VaultService.storeMasterCode(masterCode);
          $state.go('tab.categories');
        }
      });
    }
  }
})();
