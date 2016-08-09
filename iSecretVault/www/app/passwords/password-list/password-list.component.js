(function() {
  'use strict';

  angular
    .module('ipmApp.passwords.list', [
      'ionic',
      'firebase',
      'ipmApp.core.constants',
      'ipmApp.core.firebase.service',
      'ipmApp.vault.service'
    ])
    .component('passwordList', passwordList());

  function passwordList() {
    var component = {
      templateUrl: 'app/passwords/password-list/password-list.view.html',
      bindings: {
        categoryId: '<'
      },
      controller: PasswordListController
    };
    return component;
  }

  function PasswordListController($scope, $state, $cipherFactory, FirebaseService,
    VaultService) {

    var vm = this;
    var unregister;
    var stateShouldChange = false;

    vm.$onInit = init;
    vm.$onDestroy = destroy;

    if (stateShouldChange) {
      unregister();
    }

    // internal functions

    function init() {
      unregister = FirebaseService.getAuth().onAuthStateChanged(function(user) {
        if (user) {
          vm.userUid = user.uid;
          vm.masterCode = VaultService.getMasterCode();
          vm.categoryReference = FirebaseService.getCategoryReference(vm.userUid,
            vm.categoryId);
          vm.digitalFootprints = [];

          vm.back = back;
          list();
        } else {
          stateShouldChange = true;
          $state.go('authentication');
        }
      });
    }

    function destroy() {
      unregister();
    }

    function list() {
      vm.categoryReference.on('value', function(dataSnapshot) {
        var savedEncryptedDigitalFootprints = dataSnapshot.val().digitalFootprints;
        for (var key in savedEncryptedDigitalFootprints) {
          if (savedEncryptedDigitalFootprints.hasOwnProperty(key)) {
            vm.digitalFootprints.push({
              id: key,
              digitalFootprint: JSON.parse($cipherFactory.decrypt(savedEncryptedDigitalFootprints[key].cipherText,
                vm.masterCode, savedEncryptedDigitalFootprints[key].salt, savedEncryptedDigitalFootprints[key].iv))
            });
          }
        }
      });
    }

    function back() {
      $state.go('tab.categories');
    }
  }
})();
