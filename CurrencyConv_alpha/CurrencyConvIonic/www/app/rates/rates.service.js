(function() {
  'use strict';

  angular
    .module('ccApp.rates.service', [
      'ccApp.rates.constant'
    ])
    .factory('RatesService', RatesService);

  function RatesService($http, RatesConstant) {
    var service = {};
    service.getRates = getRates;
    return service;

    // Internal functions

    function getRates() {
      return $http.get(RatesConstant.URL)
        .success(function(result) {
        var rates = _.map(result, function(value, key) {
          return {
            code: key,
            rate: value
          };
        });
        return rates;
      });
    }
  }
})();