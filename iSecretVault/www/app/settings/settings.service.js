(function() {
  'use strict';

  angular.module('ipmApp.settings.service', [
    'ipmApp.core.firebase.service'
  ])
  .service('SettingsService', SettingsService);

  function SettingsService() {
    var vm = this;

    vm.updateLoginPassword = updateLoginPassword;
    vm.updateMasterCode = updateMasterCode;

    // Internal functions

    function updateLoginPassword(user, newPassword) {
      return user.updatePassword(newPassword).then(function() {
        return 'updated';
      }, function(error) {
        return error;
      });
    }

    function updateMasterCode(userReference, masterCode) {
      return userReference.update({
        'masterPassword': masterCode
      });
    }
  }
})();
