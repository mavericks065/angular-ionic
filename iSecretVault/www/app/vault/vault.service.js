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

    function storeMasterCode(masterCode) {
      vm.masterCode = masterCode;
    }

    function getMasterCode() {
      return vm.masterCode;
    }
  }
})();
