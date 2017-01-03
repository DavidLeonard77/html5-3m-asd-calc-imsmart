'use strict';

module.exports = [
  '$http',
  '$q',
  'StorageService',

  function(
    $http,
    $q,
    StorageService
  ) {

    var url = 'configuration.csv';
    var calcData = {};

    var initialize = function() {

      var deferred = $q.defer();
      $http.get(url).then(function(response) {

          var csvString = response.data;
          var allLines = csvString.split(/\r\n|\n/);
          for (var i = 0; i < allLines.length; i++) {
            var csvLine = allLines[i].split(/,(.+)?/);
            calcData[csvLine[0]] = csvLine[1];
          }
          w.asdCalc = w.asdCalc === undefined ? {} : w.asdCalc;
          w.asdCalc.configs = w.asdCalc.configs === undefined ? {} : w.asdCalc.configs;
          w.asdCalc.configs.beltTestCalculator = calcData;
          w.asdCalc.configs.asdFile = true;
          w.asdCalc.configs.csvString = csvString;
          //console.log('CONFIG',csvString,calcData);
          deferred.resolve(calcData);
          StorageService.setMeta(calcData);
        },
        function(data) {
          calcData = StorageService.getMeta();
          console.log(calcData);
          if (calcData) {
            w.asdCalc = w.asdCalc === undefined ? {} : w.asdCalc;
            w.asdCalc.configs = w.asdCalc.configs === undefined ? {} : w.asdCalc.configs;
            w.asdCalc.configs.asdFile = true;
            w.asdCalc.configs.beltTestCalculator = calcData;
            deferred.resolve(calcData);
          } else {
            // alert('Please check your internet connectivity and please try again later.');
            w.asdCalc.configs.asdFile = false;
          }
        });

      return deferred.promise;
    };

    var getBeltTestConfigs = function() {
      return w.asdCalc.configs.beltTestCalculator;
    };

    return {
      initialize: initialize,
      getBeltTestConfigs: getBeltTestConfigs
    };

  }
];
