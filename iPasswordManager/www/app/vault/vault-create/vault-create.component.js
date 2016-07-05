(function() {
  'use strict';

  angular
    .module('ipmApp.vault.create', [
      'ionic',
      'firebase',
      'ipmApp.cipher.service',
      'ipmApp.core.firebase.service',
      'ipmApp.core.constants'
    ])
    .component('vaultCreate', vaultCreate());

  function vaultCreate() {
    var component = {
      templateUrl: 'app/vault/vault-create/vault-create.view.html',
      bindings: {
        userReference: '<',
        syncObject: '='
      },
      controller: VaultCreateController
    };
    return component;
  }

  function VaultCreateController($scope, $state, $ionicHistory, $cipherFactory,
    FirebaseService) {

    $ionicHistory.nextViewOptions({
      disableAnimate: true,
      disableBack: true
    });
    $ionicHistory.clearHistory();

    var vm = this;

    vm.create = create;
    // vm.reset = reset;

    // internal functions

    function create(masterPassword) {
      vm.syncObject.$loaded().then(function() {
        // vm.userReference.child('masterPassword').set($cipherFactory.encrypt('Authenticated',
        //                                               masterPassword),
        //                                               function() {
        //   // there is an error
        //   $state.go('locked');
        // });
        var result = FirebaseService.setValue(vm.userReference, 'masterPassword',
          $cipherFactory.encrypt('Authenticated', masterPassword));
        if (result) {
          $state.go('locked');
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
