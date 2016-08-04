(function() {
  'use strict';

  angular
    .module('ipmApp.parameters.component', [
      'ionic'
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

  function ParametersController() {
  }
})();
