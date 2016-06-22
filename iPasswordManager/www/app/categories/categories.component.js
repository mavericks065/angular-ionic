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

    var fbAuth = FirebaseService.getFirebaseAuth();

    if (fbAuth) {
      var categoriesReference = FirebaseService.getUserReference(fbAuth.uid);
      var syncObject = FirebaseService.synchronize(categoriesReference);
      syncObject.$bindTo($scope, 'fireBaseData');
    } else {
      $state.go('authentication');
    }

    var vm = this;
    vm.masterPassword = $stateParams.masterPassword;
    vm.categories = [];

    vm.list = list;
    vm.add = add;

    // internal functions

    function list() {
      syncObject.$loaded().then(function() {
        for (var key in $scope.fireBaseData.categories) {
          if ($scope.fireBaseData.categories.hasOwnProperty(key)) {
            vm.categories.push({
              id: key,
              category: $scope.fireBaseData.categories[key].category
              // $cipherFactory.decrypt($scope.fireBaseData.categories[key].category.cipherText,
              //   $scope.masterPassword, $scope.fireBaseData.categories[key].category.salt,
              //   $scope.fireBaseData.categories[key].category.iv)
            });
          }
        }
      });
    }

    function add() {
      $ionicPopup.prompt({
        title: 'Enter a new category',
        inputType: 'text'
      })
      .then(function(result) {
        if (result) {
          if (!$scope.fireBaseData.categories) {
            $scope.fireBaseData.categories = {};
          }
          if (!$scope.fireBaseData.categories[result.toSHA1()]) {
            $scope.fireBaseData.categories[result.toSHA1()] = {
              category: result,
              // before : $cipherFactory.encrypt(result, $scope.masterPassword),
              digitalFootprints: {}
            };
            vm.categories.push({
              id: result.toSHA1(),
              category: result
            });
          }
        } else {
          console.log('Action not completed');
        }
      });
    }
  }
})();
