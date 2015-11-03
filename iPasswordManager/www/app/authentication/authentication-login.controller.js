(function() {
  'use strict';

  angular
    .module('ipmApp.authenticationLogin.controller', [
      'ionic',
      'firebase',
      'ipmApp.core.constants'
    ])
    .controller('AuthenticationController', AuthenticationController);

  function AuthenticationController($state, $ionicHistory, $firebaseAuth,
    CoreConstants) {

    $ionicHistory.nextViewOptions({
      disableAnimate: true,
      disableBack: true
    });

    var fb = new Firebase(CoreConstants.FIREBASE.FIREBASE_URL);
    var fbAuth = $firebaseAuth(fb);

    var self = this;
    self.login = login;
    self.register = register;

    // internal functions

    function login(user) {
      fbAuth.$authWithPassword({
        email: user.username,
        password: user.password
      }).then(function(authData) {
        $state.go('locked');
      }).catch(function(error) {
        console.error('ERROR: ' + error);
      });
    }

    function register(user) {
      fbAuth.$createUser({
        email: user.username,
        password: user.password})
      .then(function(userData) {
        return fbAuth.$authWithPassword({
          email: user.username,
          password: user.password
        });
      }).then(function(authData) {
        $state.go('createvault');
      }).catch(function(error) {
        console.error('ERROR: ' + error);
      });
    }
  }
})();
