(function() {
  'use strict';

  angular
    .module('ipmApp.passwords.list', [
      'ionic',
      'firebase',
      'ipmApp.core.constants',
      'ipmApp.core.firebase.service'
    ])
    .component('passwordList', passwordList());

  function passwordList() {
    var component = {
      templateUrl: 'app/passwords/password-list/password-list.view.html',
      bindings: {
        masterPassword: '<',
        categoryId: '<'
      },
      controller: PasswordListController
    };
    return component;
  }

  function PasswordListController($scope, $state, $cipherFactory, FirebaseService) {

    var vm = this;

    vm.$onInit = init;

    // internal functions

    function init() {
      vm.digitalFootprints = [];

      vm.fbAuth = FirebaseService.getFirebaseAuth();

      if (vm.fbAuth) {
        vm.categoryReference = FirebaseService.getCategoryReference(vm.fbAuth.uid,
          vm.categoryId);
        vm.syncObject = FirebaseService.synchronize(vm.categoryReference);

        vm.syncObject.$bindTo($scope, 'firebaseData');

        vm.back = back;
      } else {
        $state.go('authentication');
      }
      list();
    }

    function list() {
      vm.syncObject.$loaded().then(function() {
        var encryptedPasswords = $scope.firebaseData.digitalFootprints;
        for (var key in encryptedPasswords) {
          if (encryptedPasswords.hasOwnProperty(key)) {
            vm.digitalFootprints.push({
              id: key,
              digitalFootprint: JSON.parse($cipherFactory.decrypt(encryptedPasswords[key].cipherText,
                vm.masterPassword, encryptedPasswords[key].salt, encryptedPasswords[key].iv))
            });
          }
        }
      });
    }

    function back() {
      $state.go('tab.categories', {masterPassword: vm.masterPassword});
    }
  }
})();
