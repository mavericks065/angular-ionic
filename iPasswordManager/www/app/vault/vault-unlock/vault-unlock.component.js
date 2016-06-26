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
      controller: VaultUnlockController
    };
    return component;
  }

  function VaultUnlockController($scope, $state, $ionicHistory, $cipherFactory,
    FirebaseService) {

    $ionicHistory.nextViewOptions({
      disableAnimate: true,
      disableBack: true
    });
    $ionicHistory.clearHistory();

    var vm = this;

    vm.$onInit = init;

    vm.unlock = unlock;
    // vm.reset = reset;

    // internal functions

    function init() {

      vm.fbAuth = FirebaseService.getFirebaseAuth();

      if (vm.fbAuth) {
        vm.userReference = FirebaseService.getUserReference(vm.fbAuth.uid);
        // only way to  make the binding working :
        // http://stackoverflow.com/questions/29426985/angularfire-3-way-binding-without-scope
        vm.syncObject = FirebaseService.synchronize(vm.userReference);
        vm.syncObject.$bindTo($scope, 'fireBaseData');
      } else {
        $state.go('authentication');
      }
    }

    function unlock(masterPassword) {
      vm.syncObject.$loaded().then(function() {
        var decipherPhrase = $cipherFactory.decrypt($scope.fireBaseData.masterPassword.cipherText,
          masterPassword, $scope.fireBaseData.masterPassword.salt, $scope.fireBaseData.masterPassword.iv,
          {output: 'hex'});
        if (decipherPhrase === 'Authenticated'.toHex()) {
          $state.go('tab.categories', {masterPassword: masterPassword});
        }
      });
    }

    // function reset() {
    //   vm.userReference.remove(function(error) {
    //     if (error) {
    //       console.error('ERROR: ' + error);
    //     } else {
    //       $state.go('createvault');
    //     }
    //   });
    // }
  }
})();
