(function() {
  'use strict';

  angular.module('ipmApp.authentication.service', [
    'firebase',
    'ipmApp.core.constants'
  ])
  .service('AuthenticationService', AuthenticationService);

  function AuthenticationService($injector, $state, $firebaseAuth) {

    var CoreConstants = $injector.get('CoreConstants');

    var fb = new Firebase(CoreConstants.FIREBASE.FIREBASE_URL);
    var fbAuth = $firebaseAuth(fb);

    var self = this;
    self.authenticate = authenticate;
    self.register = register;

    // Internal functions

    function authenticate(user) {
      return fbAuth.$authWithPassword({
        email: user.username,
        password: user.password
      });
    }

    function register(user) {
      return fbAuth.$createUser({
        email: user.username,
        password: user.password}).then(function(userData) {
          if (userData) {
            return fbAuth.$authWithPassword({
              email: user.username,
              password: user.password
            });
          }
        });
    }
  }
})();
