(function() {
  'use strict';

  angular
    .module('ipmApp.vault.unlock', [
      'ionic',
      'firebase',
      'ipmApp.cipher.service',
      'ipmApp.core.firebase.service',
      'ipmApp.core.constants'
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

  function VaultUnlockController($scope, $state, $ionicHistory, $cipherFactory) {

    $ionicHistory.nextViewOptions({
      disableAnimate: true,
      disableBack: true
    });
    $ionicHistory.clearHistory();

    var vm = this;

    vm.unlock = unlock;

    // internal functions

    function unlock(masterPassword) {
      vm.userReference.once('value').then(function(snapshot) {
        var userData = snapshot.val();
        var decipherPhrase = $cipherFactory.decrypt(userData.masterPassword.cipherText,
          masterPassword, userData.masterPassword.salt, userData.masterPassword.iv,
          {output: 'hex'});
        if (decipherPhrase === 'Authenticated'.toHex()) {
          $state.go('tab.categories', {masterPassword: masterPassword});
        }
      });
    }
  }
})();
