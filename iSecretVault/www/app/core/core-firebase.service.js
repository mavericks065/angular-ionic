(function() {
  'use strict';

  angular.module('ipmApp.core.firebase.service', [
    'firebase',
    'ipmApp.core.constants'
  ])
  .service('FirebaseService', FirebaseService);

  function FirebaseService($firebaseObject, $firebaseAuth) {

    init();

    /*jshint -W117 */
    var fb = firebase.database().ref();
    /*jshint +W117 */

    var self = this;
    self.getFirebaseRef = getFirebaseRef;
    self.getFirebaseAuth = getFirebaseAuth;
    self.getUserReference = getUserReference;
    self.getCategoryReference = getCategoryReference;
    self.getCategoriesReference = getCategoriesReference;
    self.getPasswordsReference = getPasswordsReference;
    self.getPasswordReference = getPasswordReference;
    self.synchronize = synchronize;
    self.setValue = setValue;

    // Internal functions

    function init() {
      var config = {
        apiKey: 'AIzaSyB0jTIOB88EkrMJhljCi09qhfSciPJneQc',
        authDomain: 'ipasswordmanager.firebaseapp.com',
        databaseURL: 'https://ipasswordmanager.firebaseio.com',
        storageBucket: 'project-8977371397179982709.appspot.com'
      };
      /*jshint -W117 */
      firebase.initializeApp(config);
      /*jshint +W117 */
    }

    function getFirebaseRef() {
      return fb;
    }

    function getFirebaseAuth() {
      return $firebaseAuth().$getAuth();
    }

    function getUserReference(uid) {
      return fb.child('users/' + uid);
    }

    function getCategoriesReference(uid) {
      return fb.child('users/' + uid + '/categories');
    }

    function getCategoryReference(uid, categoryId) {
      return fb.child('users/' + uid + '/categories/' + categoryId);
    }

    function getPasswordsReference(uid, categoryId) {
      return fb.child('users/' + uid + '/categories/' + categoryId +
        '/digitalFootprints');
    }

    function getPasswordReference(uid, categoryId, digitalFootprintId) {
      return fb.child('users/' + uid + '/categories/' + categoryId +
        '/digitalFootprints/' + digitalFootprintId);
    }

    function synchronize(reference) {
      return $firebaseObject(reference);
    }

    function setValue(reference, node, value) {
      var result = reference.child(node).set(value);
      return result;
    }
  }
})();
