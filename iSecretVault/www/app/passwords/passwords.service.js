(function() {
  'use strict';

  angular.module('ipmApp.passwords.service', [
    'ipmApp.core.firebase.service'
  ])
  .service('PasswordsService', PasswordsService);

  function PasswordsService($cipherFactory) {
    var self = this;

    self.savePassword = savePassword;
    self.removePassword = removePassword;

    // Internal functions

    function removePassword(firebaseReference) {
      return firebaseReference.remove();
    }

    function savePassword(firebaseReference, password, masterCode, isUpdate) {
      var encrytedPassword = $cipherFactory.encrypt(JSON.stringify(password),
        masterCode);

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
