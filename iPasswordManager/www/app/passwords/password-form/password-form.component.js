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

    vm.masterPassword = $stateParams.masterPassword;
    vm.categoryId = $stateParams.categoryId;
    vm.digitalFootprints = [];

    var fbAuth = FirebaseService.getFirebaseAuth();

    if (fbAuth) {
      var categoryReference = FirebaseService.getCategoryReference(fbAuth.uid,
        vm.categoryId);
      var passwordsReference = FirebaseService.getPasswordsReference(fbAuth.uid,
        vm.categoryId);
      var syncObject = FirebaseService.synchronize(categoryReference);

      syncObject.$bindTo($scope, 'firebaseData');
    } else {
      $state.go('authentication');
    }

    vm.save = save;
    vm.back = back;

    // internal functions

    function save(title, username, password, hint) {
      var digitalFootprintObject = {
        title: title,
        username: username,
        password: password,
        hint: hint
      };
      syncObject.$loaded().then(function() {
        var encrytedPassword = $cipherFactory.encrypt(
          JSON.stringify(digitalFootprintObject), vm.masterPassword);

        passwordsReference.child(JSON.stringify(digitalFootprintObject).toSHA1())
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
