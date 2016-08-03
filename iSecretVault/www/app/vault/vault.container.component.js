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
    var stateShouldChange = false;
    var unregister;

    vm.$onInit = init;
    vm.$onDestroy = destroy;

    if (stateShouldChange) {
      unregister();
    }

    // internal functions

    function init() {
      unregister = FirebaseService.getAuth().onAuthStateChanged(function(user) {
        if (user) {
          vm.VaultConstants = VaultConstants;
          vm.userUid = user.uid;
          vm.userReference = FirebaseService.getUserReference(vm.userUid);
        } else {
          stateShouldChange = true;
          $state.go('authentication');
        }
      });
    }

    function destroy() {
      unregister();
    }
  }
})();
