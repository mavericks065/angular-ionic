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
      controller: VaultCreateController
    };
    return component;
  }

  function VaultCreateController($scope, $state, $ionicHistory, $cipherFactory,
    FirebaseService) {

    var fbAuth = FirebaseService.getFirebaseAuth();

    $ionicHistory.nextViewOptions({
      disableAnimate: true,
      disableBack: true
    });
    $ionicHistory.clearHistory();

    var vm = this;

    if (fbAuth) {
      vm.userReference = FirebaseService.getUserReference(fbAuth.uid);
      // only way to  make the binding working :
      // http://stackoverflow.com/questions/29426985/angularfire-3-way-binding-without-scope
      vm.syncObject = FirebaseService.synchronize(vm.userReference);
      vm.syncObject.$bindTo($scope, 'fireBaseData');
    } else {
      $state.go('authentication');
    }

    vm.create = create;
    // vm.reset = reset;

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
