(function() {
  'use strict';

  angular
    .module('ipmApp.core.constants', [])
    .constant('CoreConstants', {
      FIREBASE: {
        FIREBASE_URL: 'https://ipasswordmanager.firebaseio.com/'
      }
    });
})();
