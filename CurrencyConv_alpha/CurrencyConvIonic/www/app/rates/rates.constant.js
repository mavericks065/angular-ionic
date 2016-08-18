(function() {
  'use strict';

  angular
    .module('ccApp.rates.constant', [])
    .constant('RatesConstant', {
      URL: 'http://localhost:3000/rates'
    });
})();