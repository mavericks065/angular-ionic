(function() {
  'use strict';

  angular
    .module('ipmApp.passwords.controller', [
      'ionic',
      'firebase',
      'ipmApp.core.constants'
    ])
    .controller('PasswordController', PasswordController);

  function PasswordController($scope, $stateParams, $firebaseObject, $state,
      $cipherFactory, $ionicHistory, $injector) {

    var CoreConstants = $injector.get('CoreConstants');
    var fb = new Firebase(CoreConstants.FIREBASE.FIREBASE_URL);

    $scope.masterPassword = $stateParams.masterPassword;
    $scope.categoryId = $stateParams.categoryId;
    $scope.digitalFootprints = [];

    var fbAuth = fb.getAuth();
    if (fbAuth) {
      var categoryReference = fb.child('users/' + fbAuth.uid + '/categories/' + $stateParams.categoryId);
      var passwordsReference = fb.child('users/' + fbAuth.uid + '/categories/' +
                                $stateParams.categoryId + '/digitalFootprints');
      var syncObject = $firebaseObject(categoryReference);
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
        passwordsReference.child(JSON.stringify(digitalFootprintObject).toSHA1())
                                  .set($cipherFactory
                                    .encrypt(JSON.stringify(digitalFootprintObject),
                                            $stateParams.masterPassword), function() {
          $state.go('passwords', $stateParams);
        });
      });
    };

    $scope.back = function() {
      $ionicHistory.goBack();
    };
  }
})();
