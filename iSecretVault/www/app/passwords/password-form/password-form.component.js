(function() {
  'use strict';

  angular
    .module('ipmApp.passwords.form', [
      'ionic',
      'firebase',
      'ipmApp.core.constants',
      'ipmApp.core.firebase.service',
      'ipmApp.passwords.service',
      'ipmApp.vault.service'
    ])
    .component('passwordForm', passwordForm());

  function passwordForm() {
    var component = {
      templateUrl: 'app/passwords/password-form/password-form.view.html',
      bindings: {
        categoryId: '<',
        mode: '<',
        passwordId: '=?'
      },
      controller: PasswordFormController
    };
    return component;
  }

  function PasswordFormController($scope, $state, $cipherFactory, $ionicHistory,
    FirebaseService, PasswordsService, VaultService) {

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
          bindReferences(user);

          vm.save = save;
          vm.remove = remove;
          vm.back = back;

          if (vm.passwordId) {
            findDigitalFootPrint();
          }
        } else {
          stateShouldChange = true;
          $state.go('authentication');
        }
      });
    }

    function destroy() {
      unregister();
    }

    function bindReferences(user) {
      vm.userUid = user.uid;
      vm.categoryReference = FirebaseService.getCategoryReference(vm.userUid,
        vm.categoryId);

      vm.passwordsReference = FirebaseService.getPasswordsReference(vm.userUid,
        vm.categoryId);
      vm.passwordReference = FirebaseService.getPasswordReference(vm.userUid,
        vm.categoryId, vm.passwordId);
      vm.masterCode = VaultService.getMasterCode();
    }

    function findDigitalFootPrint() {
      vm.categoryReference.once('value').then(function(dataSnapshot) {
        var savedEncryptedDigitalFootprints = dataSnapshot.val().digitalFootprints;
        var encryptedPassword = savedEncryptedDigitalFootprints[vm.passwordId];
        vm.digitalFootprint = JSON.parse($cipherFactory.decrypt(encryptedPassword.cipherText,
          vm.masterCode, encryptedPassword.salt, encryptedPassword.iv));
      });
    }

    function save() {
      var isUpdate = vm.passwordId ? true : false;
      var firebaseReference = isUpdate ? vm.passwordReference : vm.passwordsReference;

      PasswordsService.savePassword(firebaseReference, vm.digitalFootprint,
        vm.masterCode, isUpdate).then(function() {
        $state.go('passwords', {
          categoryId: vm.categoryId
        });
      });
    }

    function remove() {
      PasswordsService.removePassword(vm.passwordReference).then(function() {
        $state.go('passwords', {
          categoryId: vm.categoryId,
          masterPassword: vm.masterCode
        });
      });
    }

    function back() {
      $ionicHistory.goBack();
    }
  }
})();
