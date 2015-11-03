(function() {
  'use strict';

  angular
    .module('ipmApp.categories.controller', [
      'ionic',
      'firebase',
      'ipmApp.core.constants'
    ])
    .controller('CategoryController', CategoryController);

  function CategoryController($scope, $state, $ionicPopup, $firebaseObject,
      $stateParams, $cipherFactory, CoreConstants) {

    $scope.masterPassword = $stateParams.masterPassword;
    $scope.categories = [];

    var fb = new Firebase(CoreConstants.FIREBASE.FIREBASE_URL);
    var fbAuth = fb.getAuth();

    if (fbAuth) {
      var categoriesReference = fb.child('users/' + fbAuth.uid);
      var syncObject = $firebaseObject(categoriesReference);
      syncObject.$bindTo($scope, 'fireBaseData');
    } else {
      $state.go('authentication');
    }

    $scope.list = function() {
      syncObject.$loaded().then(function() {
        for (var key in $scope.fireBaseData.categories) {
          if ($scope.fireBaseData.categories.hasOwnProperty(key)) {
            $scope.categories.push({
              id: key,
              category: $cipherFactory.decrypt($scope.fireBaseData.categories[key].category.cipherText,
                $scope.masterPassword, $scope.fireBaseData.categories[key].category.salt,
                $scope.fireBaseData.categories[key].category.iv)
            });
          }
        }
      });
    };

    $scope.add = function() {
      $ionicPopup.prompt({
        title: 'Enter a new category',
        inputType: 'text'
      })
      .then(function(result) {
        if (result !== undefined) {
          if ($scope.fireBaseData.categories === undefined) {
            $scope.fireBaseData.categories = {};
          }
          if ($scope.fireBaseData.categories[result.toSHA1()] === undefined) {
            $scope.fireBaseDatacategories[result.toSHA1()] = {
              category: result,
              // before : $cipherFactory.encrypt(result, $scope.masterPassword),
              passwords: {}
            };
            $scope.categories.push({
              id: result.toSHA1(),
              category: result
            });
          }
        } else {
          console.log('Action not completed');
        }
      });
    };
  }
})();
