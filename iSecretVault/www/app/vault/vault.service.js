(function() {
  'use strict';

  angular.module('ipmApp.vault.service', [
    'firebase'
  ])
  .service('VaultService', VaultService);

  function VaultService() {
    var vm = this;

    vm.getMasterPassword = getMasterPassword;
    vm.storeMasterPassword = storeMasterPassword;

    // Internal functions

    function storeMasterPassword(masterPassword) {
      vm.masterPassword = masterPassword;
    }

    function getMasterPassword() {
      return vm.masterPassword;
    }
  }
})();
