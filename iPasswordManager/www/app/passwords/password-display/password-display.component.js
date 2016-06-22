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
      controller: PasswordDisplayController
    };
    return component;
  }

  function PasswordDisplayController($scope, $stateParams, $state, $cipherFactory,
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

    vm.view = view;
    vm.back = back;

    // internal functions

    function view() {
      syncObject.$loaded().then(function() {
        var encryptedPassword = $scope.firebaseData.digitalFootprints[$stateParams.passwordId];
        vm.digitalFootprint = JSON.parse($cipherFactory.decrypt(encryptedPassword.cipherText,
          vm.masterPassword, encryptedPassword.salt, encryptedPassword.iv));
      });
    }
    function back() {
      $ionicHistory.goBack();
    }
  }
})();
