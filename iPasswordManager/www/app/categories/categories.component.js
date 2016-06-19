(function() {
  'use strict';

  angular
    .module('ipmApp.categories.component', [
      'ionic',
      'firebase',
      'ipmApp.core.firebase.service'
    ])
    .component('categories', categories());

  function categories() {
    var component = {
      templateUrl: 'app/categories/categories.view.html',
      controller: CategoriesController
    };
    return component;
  }

  function CategoriesController($scope, $state, $ionicPopup, $stateParams,
    $cipherFactory, FirebaseService) {

    $scope.masterPassword = $stateParams.masterPassword;
    $scope.categories = [];

    var fbAuth = FirebaseService.getFirebaseAuth();

    if (fbAuth) {
      var categoriesReference = FirebaseService.getUserReference(fbAuth.uid);
      var syncObject = FirebaseService.synchronize(categoriesReference);
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
              category: $scope.fireBaseData.categories[key].category
              // $cipherFactory.decrypt($scope.fireBaseData.categories[key].category.cipherText,
              //   $scope.masterPassword, $scope.fireBaseData.categories[key].category.salt,
              //   $scope.fireBaseData.categories[key].category.iv)
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
            $scope.fireBaseData.categories[result.toSHA1()] = {
              category: result,
              // before : $cipherFactory.encrypt(result, $scope.masterPassword),
              digitalFootprints: {}
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
