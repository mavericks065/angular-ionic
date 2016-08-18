(function() {
  'use strict';

  angular
    .module('ccApp.converter.service', [
      'ccApp.rates.service'
    ])
    .factory('ConverterService', ConverterService);

  function ConverterService(RatesService) {
    var service = {};
    service.convertToCurrency = convertToCurrency;
    service.computeRates = computeRates;
    return service;

    // Internal functions
    function convertToCurrency() {

    }

    function computeRates(codeToCompute) {
      // FIRST should get the object that contains the code
      var rateToCompute;
      var rates = RatesService.getRates();
      _.forEach(rates, function(value, key) {
        if (key === codeToCompute) {
          rateToCompute = value;
        }
      });
      // COMPUTE the rate for this code and the usd : codeRate = 1 / rate of this code
      var codeRate = 1 / rateToCompute;
      // THEN map the values and compute them to have them in function of this
      // code
      var codeRates = _.map(rates, function(value, key) {
        return {
          code : key,
          rate : (value * 1000) / (codeRate * 1000)
        };
      });
      return codeRates;
    }
  }
})();
