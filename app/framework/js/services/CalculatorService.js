'use strict';

module.exports = [
  'StorageBackend',
  '$http',
  '$q',

  function(
    StorageBackend
  ) {

    var calculator = {};

    function getItem(key) {
      return JSON.parse(StorageBackend.getItem(key));
    }

    function setItem(key, value) {
      StorageBackend.setItem(key, JSON.stringify(value));
    }

    this.getCalculator = function(calculatorName) {
      calculator = getItem(calculatorName);

      if (!calculator) {
        calculator = this.createNewCalculator(calculatorName);
        calculator = this.addCalculator(calculator);
      }

      return calculator;
    };

    this.createNewCalculator = function(calculatorName) {
      calculator = {};
      calculator.name = calculatorName;
      calculator.status = '';

      return calculator;
    };

    this.addCalculator = function(calc) {
      if (!calc.name) {
        throw new Error('Calculator name must be provided.');
      }

      setItem(calc.name, calc);
      calculator = calc;

      return calculator;
    };

    this.updateCalculator = function(calc) {
      if (!calc.name) {
        throw new Error('Calculator name must be provided.');
      }

      setItem(calc.name, calc);
      calculator = calc;

      return calculator;
    };

    this.calculator = function() {
      //return this.getCalculator(calc);
      return calculator;
    };

    this.saveCalculator = function(calc) {
      if (calc.name) {
        return this.updateCalculator(calc);
      } else {
        return this.addCalculator(calc);
      }
    };

    calculator = this.getCalculator('3M-ASD-Belt-Test-Calculator');
  }
];
