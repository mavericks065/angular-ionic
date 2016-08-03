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
      var stateShouldChange = false;
      var unregister = FirebaseService.getAuth().onAuthStateChanged(function(user) {
        if (user) {
          vm.VaultConstants = VaultConstants;
          vm.userUid = user.uid;
          vm.userReference = FirebaseService.getUserReference(vm.userUid);
        } else {
          $state.go('authentication');
        }
      });
      if (stateShouldChange) {
        unregister();
      }
    }
  }
})();
