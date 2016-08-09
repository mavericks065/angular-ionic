(function() {
  'use strict';

  angular
    .module('ipmApp.categories.component', [
      'ionic',
      'firebase',
      'ipmApp.core.firebase.service',
      'ipmApp.categories.service'
    ])
    .component('categories', categories());

  function categories() {
    var component = {
      templateUrl: 'app/categories/categories.view.html',
      bindings: {
      },
      controller: CategoriesController
    };
    return component;
  }

  function CategoriesController($scope, $state, $timeout, $ionicPopup,
    FirebaseService, CategoriesService) {

    var vm = this;
    var stateShouldChange = false;
    var unregister;

    vm.$onInit = init;
    vm.$onDestroy = destroy;

    if (stateShouldChange) {
      unregister();
    }

    // internal functions

    function init() {
      unregister = FirebaseService.getAuth().onAuthStateChanged(function(user) {
        if (user) {
          vm.userUid = user.uid;
          vm.userReference = FirebaseService.getUserReference(vm.userUid);
          vm.categoriesReference = FirebaseService.getCategoriesReference(vm.userUid);

          vm.add = add;
          vm.deleteCategory = deleteCategory;
          vm.firstLetter = firstLetter;

          findAndSortCategories();
        } else {
          stateShouldChange = true;
          $state.go('authentication');
        }
      });
    }

    function destroy() {
      unregister();
    }

    function findAndSortCategories() {
      // https://firebase.google.com/docs/database/web/retrieve-data
      vm.userReference.on('value', function(dataSnapshot) {
        vm.categories = [];
        var savedCategories = dataSnapshot.val().categories;
        copyCategories(savedCategories);
        sortCategories();
        $timeout(function() {
          $scope.$apply();
        });
      });
    }

    function copyCategories(savedCategories) {
      for (var key in savedCategories) {
        if (savedCategories.hasOwnProperty(key) &&
            savedCategories[key].category) {
          vm.categories.push({
            id: key,
            category: savedCategories[key].category
          });
        }
      }
    }

    function sortCategories() {
      vm.categories = _.sortBy(vm.categories, function(category) {
        return category.category.toLowerCase();
      });
    }

    function add() {
      $ionicPopup.prompt({
        title: 'Enter a new category',
        inputType: 'text'
      }).then(function(result) {
        if (result) {
          var newCategoryReference = FirebaseService.getCategoryReference(vm.userUid,
            result.toSHA1());

          FirebaseService.isReferenceExisting(newCategoryReference)
            .then(function(isReferenceExisting) {
              if (!isReferenceExisting) {
                CategoriesService.insertCategory(vm.categoriesReference, result);
              }
            });
        } else {
          console.log('Action not completed');
        }
      });
    }

    function deleteCategory(category) {

      CategoriesService.removeCategory(FirebaseService.getCategoryReference(vm.userUid,
        category.id));
    }

    function firstLetter(category) {
      return category.toUpperCase() && category.charAt(0).toUpperCase();
    }
  }
})();
