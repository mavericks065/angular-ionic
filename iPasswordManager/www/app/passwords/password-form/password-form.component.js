(function() {
  'use strict';

  angular
    .module('ipmApp.passwords.form', [
      'ionic',
      'firebase',
      'ipmApp.core.constants',
      'ipmApp.core.firebase.service'
    ])
    .component('passwordForm', passwordForm());

  function passwordForm() {
    var component = {
      templateUrl: 'app/passwords/password-form/password-form.view.html',
      controller: PasswordFormController
    };
    return component;
  }

  function PasswordFormController($scope, $stateParams, $state, $cipherFactory,
    $ionicHistory, FirebaseService) {

    var vm = this;

    vm.save = save;
    vm.back = back;

    vm.$onInit = init;

    // internal functions

    function init() {

      vm.masterPassword = $stateParams.masterPassword;
      vm.categoryId = $stateParams.categoryId;
      vm.digitalFootprints = [];

      vm.fbAuth = FirebaseService.getFirebaseAuth();

      if (vm.fbAuth) {
        vm.categoryReference = FirebaseService.getCategoryReference(vm.fbAuth.uid,
          vm.categoryId);

        vm.passwordsReference = FirebaseService.getPasswordsReference(vm.fbAuth.uid,
          vm.categoryId);
        vm.syncObject = FirebaseService.synchronize(vm.categoryReference);

        vm.syncObject.$bindTo($scope, 'firebaseData');
      } else {
        $state.go('authentication');
      }
    }

    function save(title, username, password, hint) {
      var digitalFootprintObject = {
        title: title,
        username: username,
        password: password,
        hint: hint
      };
      vm.syncObject.$loaded().then(function() {
        var encrytedPassword = $cipherFactory.encrypt(
          JSON.stringify(digitalFootprintObject), vm.masterPassword);

        vm.passwordsReference.child(JSON.stringify(digitalFootprintObject).toSHA1())
          .set(encrytedPassword, function() {
            $state.go('passwords', $stateParams);
          });
      });
    }

    function back() {
      $ionicHistory.goBack();
    }
  }
})();
