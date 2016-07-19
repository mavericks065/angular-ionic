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
      vm.fbAuth = FirebaseService.getAuthentication();
      if (vm.fbAuth) {
        bindReferences();

        vm.syncObject = FirebaseService.synchronize(vm.categoryReference);
        vm.syncObject.$bindTo($scope, 'firebaseData');

        vm.save = save;
        vm.remove = remove;
        vm.back = back;
      } else {
        $state.go('authentication');
      }

      if (vm.passwordId) {
        findDigitalFootPrint();
      }
    }

    function bindReferences() {
      vm.categoryReference = FirebaseService.getCategoryReference(vm.fbAuth.uid,
        vm.categoryId);

      vm.passwordsReference = FirebaseService.getPasswordsReference(vm.fbAuth.uid,
        vm.categoryId);
      vm.passwordReference = FirebaseService.getPasswordReference(vm.fbAuth.uid,
        vm.categoryId, vm.passwordId);
    }

    function findDigitalFootPrint() {
      vm.syncObject.$loaded().then(function() {
        var encryptedPassword = $scope.firebaseData.digitalFootprints[vm.passwordId];
        vm.digitalFootprint = JSON.parse($cipherFactory.decrypt(encryptedPassword.cipherText,
          vm.masterPassword, encryptedPassword.salt, encryptedPassword.iv));
      });
    }

    function save() {
      vm.syncObject.$loaded().then(function() {

        var isUpdate = vm.passwordId ? true : false;
        var firebaseReference = isUpdate ? vm.passwordReference : vm.passwordsReference;

        PasswordsService.savePassword(firebaseReference, vm.digitalFootprint,
          vm.masterPassword, isUpdate).then(function() {
          $state.go('passwords', {
            categoryId: vm.categoryId,
            masterPassword: vm.masterPassword
          });
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
