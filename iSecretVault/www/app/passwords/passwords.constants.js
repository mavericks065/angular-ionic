(function() {
  'use strict';

  angular
    .module('ipmApp.passwords.constants', [])
    .constant('PasswordsConstants', {
      MODE: {
        CREATE: 'create',
        UPDATE: 'update'
      }
    });
})();
