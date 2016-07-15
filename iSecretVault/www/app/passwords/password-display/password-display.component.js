(function() {
  'use strict';

  angular
    .module('ipmApp.passwords.display', [
      'ionic',
      'firebase',
      'ipmApp.core.constants',
      'ipmApp.core.firebase.service'
    ])
    .component('passwordDisplay', passwordDisplay());

  function passwordDisplay() {
    var component = {
      templateUrl: 'app/passwords/password-display/password-display.view.html',
      bindings: {
        masterPassword: '<',
        categoryId: '<',
        passwordId: '<'
      },
      controller: PasswordDisplayController
    };
    return component;
  }

  function PasswordDisplayController($scope, $state, $cipherFactory, $ionicHistory,
    FirebaseService) {

    var vm = this;

    vm.view = view;
    vm.editPassword = editPassword;
    vm.back = back;

    vm.$onInit = init;

    // internal functions

    function init() {
      vm.fbAuth = FirebaseService.getFirebaseAuth().$getAuth();

      if (vm.fbAuth) {
        vm.categoryReference = FirebaseService.getCategoryReference(vm.fbAuth.uid,
          vm.categoryId);
        vm.syncObject = FirebaseService.synchronize(vm.categoryReference);

        vm.syncObject.$bindTo($scope, 'firebaseData');
      } else {
        $state.go('authentication');
      }
    }

    function view() {
      vm.syncObject.$loaded().then(function() {
        var encryptedPassword = $scope.firebaseData.digitalFootprints[vm.passwordId];
        vm.digitalFootprint = JSON.parse($cipherFactory.decrypt(encryptedPassword.cipherText,
          vm.masterPassword, encryptedPassword.salt, encryptedPassword.iv));
      });
    }

    function editPassword() {
      $state.go('editpassword', {
        masterPassword: vm.masterPassword,
        categoryId: vm.categoryId,
        passwordId: vm.passwordId,
        password: vm.digitalFootprint
      });
    }

    function back() {
      $ionicHistory.goBack();
    }
  }
})();
