(function() {
  'use strict';

  angular
    .module('ccApp.converter.controller', [
      'ccApp.converter.service',
      'ccApp.currencies',
      'ccApp.rates'
    ])
    .controller('ConverterController', ConverterController);

  function ConverterController(CurrenciesService, ConverterService) {
    var self = this;

    self.getAvailableCurrencies = getAvailableCurrencies;
    self.getConvertedAmount = getConvertedAmount;

    // Initialisation
    initCurrencies();

    // Internal functions
    function initCurrencies() {
      CurrenciesService.getCurrencies().then(function(currencies) {
        self.currencies = currencies;
        self.selectedCurrency = _.first(self.currencies);
      });
    }
    function getAvailableCurrencies() {
      return _.without(self.currencies, self.selectedCurrency);
    }
    function getConvertedAmount() {
      if (self.amount) {
        var convertedRates = ConverterService.computeRates(self.selectedCurrency.code);
        var computedRates = _.map(convertedRates, function(value, key) {
          return {
            code: key,
            rate: value * self.amount
          };
        });
        return computedRates;
      } else {
        return 0;
      }
    }
  }
})();
