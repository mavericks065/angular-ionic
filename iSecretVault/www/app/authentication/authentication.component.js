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

  function AuthenticationController($state, $ionicPopup, $translate,
    AuthenticationService) {

    var vm = this;
    vm.login = login;

    // internal functions

    function login(user) {
      AuthenticationService.authenticate(user).then(function(authData) {
        if (authData) {
          $state.go('locked');
        }
      }).catch(function(error) {
        console.error('Login Failed: ' + error);
        $ionicPopup.alert({
          title: $translate.instant('errorTitle'),
          template: $translate.instant('errorMsg')
        });
      });
    }
  }
})();
