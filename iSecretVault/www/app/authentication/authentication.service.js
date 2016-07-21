(function() {
  'use strict';

  angular.module('ipmApp.authentication.service', [
    'ipmApp.core.firebase.service',
    'ipmApp.core.constants'
  ])
  .service('AuthenticationService', AuthenticationService);

  function AuthenticationService($injector, $state, FirebaseService) {
    var fbAuth = FirebaseService.getFirebaseAuth();

    var self = this;
    self.authenticate = authenticate;
    self.register = register;

    // Internal functions

    function authenticate(user) {
      return fbAuth.$signInWithEmailAndPassword(user.username, user.password);
    }

    function register(user) {
      return fbAuth.$createUserWithEmailAndPassword(user.username, user.password)
        .then(function(userData) {
          if (userData) {
            return authenticate(user);
          }
        });
    }
  }
})();
