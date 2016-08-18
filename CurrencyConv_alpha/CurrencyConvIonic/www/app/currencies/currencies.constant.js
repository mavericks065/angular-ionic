(function() {
  'use strict';

  angular
    .module('ccApp.currencies.constant', [])
    .constant('CurrenciesConstant', {
      URL: {
        LOCAL: 'app/currencies/currencies.data.json',
        REMOTE: 'http://localhost:3000/currencies'
      }
    });
})();