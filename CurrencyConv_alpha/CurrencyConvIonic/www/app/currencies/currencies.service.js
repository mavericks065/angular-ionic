(function() {
  'use strict';

  angular
    .module('ccApp.currencies.service', [
      'ngResource',
      'ccApp.currencies.constant'
    ])
    .factory('CurrenciesService', CurrenciesService);

  function CurrenciesService($resource, CurrenciesConstant) {
    var service = {};
    service.getCurrencies = getCurrencies;
    return service;

    // Internal functions

    function getCurrencies(remote) {
      var url = CurrenciesConstant.URL[remote ? 'REMOTE' : 'LOCAL'];
      return $resource(url, undefined, {'get': {isArray: true}}).get().$promise
        .then(function(currencies) {
          return _.map(currencies, function(currency) {
            return currency.toJSON();
          });
        });
    }
  }
})();