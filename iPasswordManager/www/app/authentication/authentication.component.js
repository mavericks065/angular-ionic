(function() {
  'use strict';

  angular
    .module('ipmApp.authentication.component', [
      'ionic',
      'firebase',
      'ipmApp.core.constants',
      'ipmApp.authentication.service'
    ])
    .component('authentication', authentication());

  function authentication() {
    var component = {
      templateUrl: 'app/authentication/authentication.view.html',
      controller: AuthenticationController
    };
    return component;
  }

  function AuthenticationController($state, $ionicHistory, $ionicPopup,
    $firebaseAuth, AuthenticationService) {

    $ionicHistory.nextViewOptions({
      disableAnimate: true,
      disableBack: true
    });

    var vm = this;
    vm.login = login;
    vm.register = register;

    // internal functions

    function login(user) {
      AuthenticationService.authenticate(user).then(function(authData) {
        if (authData) {
          $state.go('locked');
        }
      }).catch(function(error) {
        console.error('Login Failed: ' + error);
        $ionicPopup.alert({
           title: 'Login failed',
           template: 'Log in is not possible, login or password are incorrect.'
         });
      });
    }

    function register(user) {
      AuthenticationService.register(user).then(function(authData) {
        if (authData) {
          $state.go('createvault');
        }
      }).catch(function(error) {
        console.error('Registration Failed: ' + error);
        $ionicPopup.alert({
           title: 'Registration failed',
           template: 'Please try again in a few minutes.'
         });
      });
    }
  }
})();
