(function() {
  'use strict';

  angular.module('ipmApp.vault.service', [
    'firebase'
  ])
  .service('VaultService', VaultService);

  function VaultService() {
    var vm = this;

    vm.getMasterCode = getMasterCode;
    vm.storeMasterCode = storeMasterCode;

    // Internal functions

    function storeMasterCode(masterPassword) {
      vm.masterPassword = masterPassword;
    }

    function getMasterCode() {
      return vm.masterPassword;
    }
  }
})();
