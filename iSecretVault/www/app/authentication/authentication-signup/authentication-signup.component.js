(function() {
  'use strict';

  angular
    .module('ipmApp.authentication.signup.component', [
      'ionic',
      'firebase',
      'ipmApp.core.constants',
      'ipmApp.authentication.service'
    ])
    .component('authenticationSignup', authenticationSignup());

  function authenticationSignup() {
    var component = {
      templateUrl: 'app/authentication/authentication-signup/authentication-signup.view.html',
      controller: SignupController
    };
    return component;
  }

  function SignupController($state, $ionicHistory, $ionicPopup, AuthenticationService) {

    var vm = this;
    vm.back = back;
    vm.signupUser = signupUser;

    // internal functions

    function signupUser() {
      if (validatePasswords()) {
        AuthenticationService.register(vm.user).then(function(authData) {
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
      $ionicPopup.alert({
        title: 'Passwords error',
        template: 'Sorry but your passwords are not exact.'
      });
    }

    function back() {
      $ionicHistory.goBack();
    }

    function validatePasswords() {
      return vm.user.password === vm.user.passwordConfirmation;
    }
  }
})();
