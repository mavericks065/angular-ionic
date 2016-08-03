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
          vm.categoryReference = FirebaseService.getCategoryReference(vm.userUid,
            vm.categoryId);

          vm.editPassword = editPassword;
          vm.back = back;

          view();
        } else {
          stateShouldChange = true;
          $state.go('authentication');
        }
      });
    }

    function destroy() {
      unregister();
    }

    function view() {
      vm.categoryReference.once('value').then(function(dataSnapshot) {
        var savedEncryptedDigitalFootprints = dataSnapshot.val().digitalFootprints;
        var encryptedPassword = savedEncryptedDigitalFootprints[vm.passwordId];
        vm.digitalFootprint = JSON.parse($cipherFactory.decrypt(encryptedPassword.cipherText,
          vm.masterPassword, encryptedPassword.salt, encryptedPassword.iv));
      });
    }

    function editPassword() {
      $state.go('editpassword', {
        masterPassword: vm.masterPassword,
        categoryId: vm.categoryId,
        passwordId: vm.passwordId
      });
    }

    function back() {
      $ionicHistory.goBack();
    }
  }
})();
