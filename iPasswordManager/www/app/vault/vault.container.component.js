(function() {
  'use strict';

  angular
    .module('ipmApp.vault.container', [
      'ionic',
      'firebase',
      'ipmApp.cipher.service',
      'ipmApp.core.firebase.service',
      'ipmApp.core.constants'
    ])
    .constant('VaultConstants', {
      MODE: {
        CREATE: 'CREATE',
        UNLOCK: 'UNLOCK'
      }
    })
    .component('vault', vault());

  function vault() {
    var component = {
      templateUrl: 'app/vault/vault.container.view.html',
      bindings: {
        mode: '<'
      },
      controller: VaultContainerController
    };
    return component;
  }

  function VaultContainerController($scope, $state, $ionicHistory, $cipherFactory,
    FirebaseService, VaultConstants) {

    $ionicHistory.nextViewOptions({
      disableAnimate: true,
      disableBack: true
    });
    $ionicHistory.clearHistory();

    var vm = this;

    vm.$onInit = init;

    // internal functions

    function init() {

      vm.VaultConstants = VaultConstants;
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

  }
})();
