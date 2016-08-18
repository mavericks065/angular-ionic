var express = require('express'),
  router = express.Router(),
  request = require('request'),
  bluebird = require('bluebird'),
  xml2js = require('xml2js'),
  _ = require('underscore'),
  jsonPath = require('JSONPath'),
  oxr = require('oxr');

var service = oxr.factory({
  appId: 'd84ba9a7b477466ab6166fe6397c736d'
});

bluebird.promisifyAll(request);

function getCurrencies() {
  return service.currencies().then(function(result) {
    var currencies = result;
    return currencies;
  });
}

router.get('/', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  getCurrencies().then(function(currencies) {
    res.json(currencies);
  });
});

module.exports = router;