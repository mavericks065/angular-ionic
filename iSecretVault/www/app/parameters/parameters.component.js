(function() {
  'use strict';

  angular
    .module('ipmApp.parameters.component', [
      'ionic',
      'ipmApp.authentication.service'
    ])
    .component('parameters', parameters());

  function parameters() {
    var component = {
      templateUrl: 'app/parameters/parameters.view.html',
      bindings: {
        masterPassword: '<'
      },
      controller: ParametersController
    };
    return component;
  }

  function ParametersController($state, AuthenticationService) {
    var vm = this;

    vm.signOut = signOut;

    // internal functions

    function signOut() {
      AuthenticationService.signOut();
      $state.go('authentication');
    }
  }
})();
