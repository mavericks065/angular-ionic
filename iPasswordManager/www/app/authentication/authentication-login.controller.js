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
    $injector) {

    var CoreConstants = $injector.get('CoreConstants');
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
      }).then(function(error, authData) {
        if (error) {
          console.error('Login failed: ' + error);
        } else if (authData) {
          $state.go('locked');
        }
      });
    }

    function register(user) {
      fbAuth.$createUser({
        email: user.username,
        password: user.password})
      .then(function(error, userData) {
        if (error) {
          switch (error.code) {
            case 'EMAIL_TAKEN':
              console.log('The new user account cannot be created because the email is already in use.');
              break;
            case 'INVALID_EMAIL':
              console.log('The specified email is not a valid email.');
              break;
            default:
              console.log('Error creating user:', error);
          }
        } else if (userData) {
          return fbAuth.$authWithPassword({
            email: user.username,
            password: user.password
          });
        }
      }).then(function(error, authData) {
        if (error) {
          console.error('Login failed: ' + error);
        } else if (authData) {
          $state.go('createvault');
        }
      });
    }
  }
})();
