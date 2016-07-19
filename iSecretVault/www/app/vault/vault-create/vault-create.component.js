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
        userReference: '<'
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

    // internal functions

    function create(masterPassword) {
      setUserData(masterPassword);
      $state.go('locked');
    }

    /**
    * Insert a new master password
    * Insert Categories object to not have to do it later
    */
    function setUserData(masterPassword) {
      FirebaseService.setValue(vm.userReference, 'masterPassword',
        $cipherFactory.encrypt('Authenticated', masterPassword));
      FirebaseService.setValue(vm.userReference, 'categories', {
        description: 'List of categories of encrypted data.'
      });
    }
  }
})();
