(function() {
  'use strict';

  angular
    .module('ipmApp.authenticationLogin.component', [
      'ionic',
      'firebase',
      'ipmApp.core.constants',
      'ipmApp.authenticationLogin.service'
    ])
    .component('authentication', authentication());

  function authentication() {
    var component = {
      templateUrl: 'app/authentication/authentication-login.view.html',
      controller: AuthenticationController
    };
    return component;
  }

  function AuthenticationController($state, $ionicHistory, $firebaseAuth,
    AuthenticationLoginService) {

    $ionicHistory.nextViewOptions({
      disableAnimate: true,
      disableBack: true
    });

    var self = this;
    self.login = login;
    self.register = register;

    // internal functions

    function login(user) {
      AuthenticationLoginService.authenticate(user).then(function(authData) {
        if (authData) {
          $state.go('locked');
        }
      }).catch(function(error) {
        console.error('Login Failed: ' + error);
      });
    }

    function register(user) {
      AuthenticationLoginService.register(user).then(function(authData) {
        if (authData) {
          $state.go('createvault');
        }
      }).catch(function(error) {
        console.error('Registration Failed: ' + error);
      });
    }
  }
})();
