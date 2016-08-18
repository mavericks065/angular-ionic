var express = require('express'),
  router = express.Router(),
  request = require('request'),
  bluebird = require('bluebird'),
  xml2js = require('xml2js'),
  _ = require('underscore'),
  jsonPath = require('JSONPath'),
  oxr = require('oxr');

bluebird.promisifyAll(request);

var service = oxr.factory({
  appId: 'd84ba9a7b477466ab6166fe6397c736d'
});

function getRates() {
  return service.latest().then(function(result) {
    var rates = result.rates;
    console.log(rates);
    return rates;
  });
}

router.get('/', function(req, res) {
  getRates().then(function(rates) {
    res.json(rates);
  });
});

module.exports = router;