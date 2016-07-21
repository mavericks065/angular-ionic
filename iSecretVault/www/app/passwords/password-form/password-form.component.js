(function() {
  'use strict';

  angular
    .module('ipmApp.passwords.form', [
      'ionic',
      'firebase',
      'ipmApp.core.constants',
      'ipmApp.core.firebase.service',
      'ipmApp.passwords.service'
    ])
    .component('passwordForm', passwordForm());

  function passwordForm() {
    var component = {
      templateUrl: 'app/passwords/password-form/password-form.view.html',
      bindings: {
        masterPassword: '<',
        categoryId: '<',
        mode: '<',
        passwordId: '=?'
      },
      controller: PasswordFormController
    };
    return component;
  }

  function PasswordFormController($scope, $state, $cipherFactory, $ionicHistory,
    FirebaseService, PasswordsService) {

    var vm = this;

    vm.$onInit = init;

    // internal functions

    function init() {

      var unregister = FirebaseService.getAuth().onAuthStateChanged(function(user) {
        if (user) {
          bindReferences(user);

          vm.save = save;
          vm.remove = remove;
          vm.back = back;

          if (vm.passwordId) {
            findDigitalFootPrint();
          }
        } else {
          $state.go('authentication');
        }
      });
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
    }

    function findDigitalFootPrint() {
      vm.categoryReference.once('value').then(function(dataSnapshot) {
        var savedEncryptedDigitalFootprints = dataSnapshot.val().digitalFootprints;
        var encryptedPassword = savedEncryptedDigitalFootprints[vm.passwordId];
        vm.digitalFootprint = JSON.parse($cipherFactory.decrypt(encryptedPassword.cipherText,
          vm.masterPassword, encryptedPassword.salt, encryptedPassword.iv));
      });
    }

    function save() {
      var isUpdate = vm.passwordId ? true : false;
      var firebaseReference = isUpdate ? vm.passwordReference : vm.passwordsReference;

      PasswordsService.savePassword(firebaseReference, vm.digitalFootprint,
        vm.masterPassword, isUpdate).then(function() {
        $state.go('passwords', {
          categoryId: vm.categoryId,
          masterPassword: vm.masterPassword
        });
      });
    }

    function remove() {
      PasswordsService.removePassword(vm.passwordReference).then(function() {
        $state.go('passwords', {
          categoryId: vm.categoryId,
          masterPassword: vm.masterPassword
        });
      });
    }

    function back() {
      $ionicHistory.goBack();
    }
  }
})();
