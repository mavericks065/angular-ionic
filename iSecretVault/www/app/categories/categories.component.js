(function() {
  'use strict';

  angular
    .module('ipmApp.categories.component', [
      'ionic',
      'firebase',
      'ipmApp.core.firebase.service',
      'ionic.ion.autoListDivider'
    ])
    .component('categories', categories());

  function categories() {
    var component = {
      templateUrl: 'app/categories/categories.view.html',
      bindings: {
        masterPassword: '<'
      },
      controller: CategoriesController
    };
    return component;
  }

  function CategoriesController($scope, $state, $ionicPopup, FirebaseService) {

    var vm = this;

    vm.$onInit = init;

    // internal functions

    function init() {
      vm.fbAuth = FirebaseService.getFirebaseAuth();

      if (vm.fbAuth) {
        vm.categoriesReference = FirebaseService.getUserReference(vm.fbAuth.uid);
        vm.syncObject = FirebaseService.synchronize(vm.categoriesReference);
        vm.syncObject.$bindTo($scope, 'fireBaseData');

        vm.add = add;
      } else {
        $state.go('authentication');
      }
      findAndSortCategories();
    }

    function add() {
      $ionicPopup.prompt({
        title: 'Enter a new category',
        inputType: 'text'
      }).then(function(result) {
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
      }).then(function() {
        findAndSortCategories();
      });
    }

    function findAndSortCategories() {
      vm.categories = [];
      vm.syncObject.$loaded().then(function() {
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
      }).then(function() {
        sortCategories();
      });
    }

    function sortCategories() {
      vm.categories = _.sortBy(vm.categories, function(category) {
        return category.category;
      });
    }
  }
})();
