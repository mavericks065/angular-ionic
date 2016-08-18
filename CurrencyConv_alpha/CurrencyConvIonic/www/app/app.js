(function() {
  'use strict';

  angular
    .module('ccApp', [
      'ionic',
      'LocalStorageModule',
      'ccApp.core',
      'ccApp.converter',
      'ccApp.currencies',
      'ccApp.rates',
      'ccApp.information'
    ])
    .run(function($ionicPlatform) {
      $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
          StatusBar.styleDefault();
        }
      });
    })
    .config(function (localStorageServiceProvider) {
      localStorageServiceProvider
        .setPrefix('CurrencyConv');
    });

})();