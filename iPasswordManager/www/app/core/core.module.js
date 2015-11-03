(function() {
  'use strict';

  angular.module('ipmApp.core', [
    'ipmApp.core.constants',
    'ipmApp.core.route',
    'ipmApp.authenticationLogin',
    'ipmApp.vault',
    'ipmApp.categories',
    'ipmApp.passwords',
    'ipmApp.cipher.service'
  ]);
})();
