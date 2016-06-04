(function() {
  'use strict';

  angular
    .module('ipmApp.passwords.controller', [
      'ionic',
      'firebase',
      'ipmApp.core.constants',
      'ipmApp.core.firebase.service'
    ])
    .controller('PasswordController', PasswordController);

  function PasswordController($scope, $stateParams, $state, $cipherFactory,
      $ionicHistory, FirebaseService) {

    $scope.masterPassword = $stateParams.masterPassword;
    $scope.categoryId = $stateParams.categoryId;
    $scope.digitalFootprints = [];

    var fbAuth = FirebaseService.getFirebaseAuth();

    if (fbAuth) {
      var categoryReference = FirebaseService.getCategoryReference(fbAuth.uid,
        $stateParams.categoryId);
      var passwordsReference = FirebaseService.getPasswordsReference(fbAuth.uid,
        $stateParams.categoryId);
      var syncObject = FirebaseService.synchronize(categoryReference);

      syncObject.$bindTo($scope, 'firebaseData');
    } else {
      $state.go('authentication');
    }

    $scope.list = function() {
      syncObject.$loaded().then(function() {
        var encryptedPasswords = $scope.firebaseData.digitalFootprints;
        for (var key in encryptedPasswords) {
          if (encryptedPasswords.hasOwnProperty(key)) {
            $scope.digitalFootprints.push({
              id: key,
              digitalFootprint: JSON.parse($cipherFactory.decrypt(encryptedPasswords[key].cipherText,
                $stateParams.masterPassword, encryptedPasswords[key].salt, encryptedPasswords[key].iv))
            });
          }
        }
      });
    };

    $scope.view = function() {
      syncObject.$loaded().then(function() {
        var encryptedPassword = $scope.firebaseData.digitalFootprints[$stateParams.passwordId];
        $scope.digitalFootprint = JSON.parse($cipherFactory.decrypt(encryptedPassword.cipherText,
          $stateParams.masterPassword, encryptedPassword.salt, encryptedPassword.iv));
      });
    };

    $scope.save = function(title, username, password, hint) {
      var digitalFootprintObject = {
        title: title,
        username: username,
        password: password,
        hint: hint
      };
      syncObject.$loaded().then(function() {
        var encrytedPassword = $cipherFactory.encrypt(
          JSON.stringify(digitalFootprintObject), $stateParams.masterPassword);

        passwordsReference.child(JSON.stringify(digitalFootprintObject).toSHA1())
          .set(encrytedPassword, function() {
          $state.go('passwords', $stateParams);
        });
      });
    };

    $scope.back = function() {
      $ionicHistory.goBack();
    };
  }
})();
