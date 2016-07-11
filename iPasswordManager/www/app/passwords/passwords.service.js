(function() {
  'use strict';

  angular.module('ipmApp.passwords.service', [
    'ipmApp.core.firebase.service'
  ])
  .service('PasswordsService', PasswordsService);

  function PasswordsService($cipherFactory) {
    var self = this;

    self.savePassword = savePassword;

    // Internal functions

    function savePassword(firebaseReference, password, masterPassword, isUpdate) {
      var encrytedPassword = $cipherFactory.encrypt(JSON.stringify(password),
        masterPassword);

      if (isUpdate) {
        return updatePassword(firebaseReference, encrytedPassword);
      } else {
        return insertPassword(firebaseReference, password, encrytedPassword);
      }
    }

    function updatePassword(firebaseReference, password) {
      return firebaseReference.update(password);
    }

    function insertPassword(firebaseReference, password, encrytedPassword) {
      return firebaseReference.child(JSON.stringify(password).toSHA1()).set(encrytedPassword);
    }
  }
})();
