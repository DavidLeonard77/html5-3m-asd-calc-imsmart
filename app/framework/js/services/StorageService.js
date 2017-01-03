'use strict';

module.exports = [
  'StorageBackend',
  '$http',
  '$q',

  function(
    StorageBackend,
    $http,
    $q
  ) {

    var prefix = 'asd-';
    var crop;
    var functionStatus = false;

    function getItem(key) {
      return JSON.parse(StorageBackend.getItem(key));
    }

    function setItem(key, value) {
      StorageBackend.setItem(key, JSON.stringify(value));
    }

    this.removeAccount = function(key) {
      StorageBackend.removeItem(key);
    };

    this.getAccount = function(id) {
      var account = getItem(id);
      return account;
    };

    this.getMeta = function() {
      var account = getItem('asdMeta');
      return account;
    };

    this.setMeta = function(account) {
      setItem('asdMeta', account);
    };

    this.addAccount = function(account) {
      if (!account.name) {
        throw new Error('Account name must be provided.');
      }

      account.id = prefix + account.name;
      setItem(account.id, account);
      return account;
    };

    this.updateAccount = function(account) {
      setItem(account.id, account);
      return account;
    };

    this.saveAccount = function(account) {
      if (account.id) {
        return this.updateAccount(account);
      } else {
        return this.addAccount(account);
      }
    };

    this.getCalculatorList = function() {
      var deferred = $q.defer();
      $http.get('framework/data/calculator-list.json').success(
        function(data) {
          crop = data;
          deferred.resolve(crop);
        }).error(function(msg) {
        deferred.reject(msg);
      });
      return deferred.promise;
    };

    this.changeFunctionStatus = function() {
      functionStatus = !functionStatus;
      return functionStatus;
    };

    this.getFunctionStatus = function() {
      return functionStatus;
    };

    this.getCalculator = function(calculatorName) {
      var calculator = getItem(calculatorName);

      if (!calculator) {
        calculator = this.createNewCalculator(calculatorName);
        calculator = this.addCalculator(calculator);
      }

      return calculator;
    };

    this.createNewCalculator = function(calculatorName) {
      var calculator = {};
      calculator.name = calculatorName;
      calculator.status = '';

      return calculator;
    };

    this.addCalculator = function(calculator) {
      if (!calculator.name) {
        throw new Error('Calculator name must be provided.');
      }

      setItem(calculator.name, calculator);

      return calculator;
    };

    this.updateCalculator = function(calculator) {
      if (!calculator.name) {
        throw new Error('Calculator name must be provided.');
      }

      setItem(calculator.name, calculator);

      return calculator;
    };

    this.saveCalculator = function(calculator) {
      if (calculator.name) {
        return this.updateCalculator(calculator);
      } else {
        return this.addCalculator(calculator);
      }
    };
  }
];
