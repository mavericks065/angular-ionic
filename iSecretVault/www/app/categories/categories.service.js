(function() {
  'use strict';

  angular.module('ipmApp.categories.service', [
    'firebase'
  ])
  .service('CategoriesService', CategoriesService);

  function CategoriesService() {
    var self = this;

    self.insertCategory = insertCategory;

    // Internal functions

    function insertCategory(firebaseReference, category) {
      var categoryReference = firebaseReference.push(category.toSHA1());
      categoryReference.set({
        'category': category,
        'digitalFootprints': {}
      });
    }
  }
})();
