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
      controller: PasswordListController
    };
    return component;
  }

  function PasswordListController($scope, $stateParams, $state, $cipherFactory,
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

    vm.list = list;
    vm.back = back;

    // internal functions

    function list() {
      syncObject.$loaded().then(function() {
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
      $ionicHistory.goBack();
    }
  }
})();
