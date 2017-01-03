'use strict';

module.exports = [
  '$state',
  '$scope',
  'CalculatorService',
  'ConfigService',

  function(
    $state,
    $scope,
    CalculatorService,
    ConfigService
  ) {

    //Configurations
    $scope.config = ConfigService.getBeltTestConfigs();

    //Storage access
    $scope.calculator = CalculatorService.calculator();

    // Forms
    $scope.forms = {};
    $scope.fieldInvalid = function(form, input) {
      return $scope.forms[form][input.name].$invalid && !$scope.forms[form][input.name].$pristine;
    };

    // Navigation
    $scope.navigation = {};

    // Reset values
    $scope.navigation.reset = function() {
      $scope.calculator.cutOff.compCostPerWheel = null;
      $scope.calculator.cutOff.compLaborBurdenCostPerHour = null;
      $scope.calculator.cutOff.compSecondsPerChangeover = null;
      $scope.calculator.cutOff.tMCostPerWheel = null;
    };

    // Backward navigation
    $scope.navigation.goBack = function() {
      CalculatorService.saveCalculator($scope.calculator);
      $state.go('3m-asd-calc.cut-off-wheel-performance');
    };

    // Forward navigation
    $scope.navigation.gotoNext = function(form) {
      if ($scope.forms[form].$valid) {
        CalculatorService.saveCalculator($scope.calculator);
        $state.go('3m-asd-calc.cut-off-wheel-results');
      }
    };

    // Inputs
    $scope.calc = {
      id: 'cutOff',
      key: 'cut-off-wheel',
      name: 'cocalculatorName',
      title: 'cosavingsTitle',
      form: 'savingsInputForm',

      cols: [{
        title: 'cosavingsCompetitorTitle',
        label: 'competitorProduct',
        css: 'competitor-list',
        inputs: [0, 1, 2]
      }, {
        title: 'cosavingsThreeMTitle',
        label: 'threeMProduct',
        css: 'client-list',
        inputs: [3]
      }],

      input: [{
        label: 'cosavingsCompInput1PlaceHolder',
        model: 'compCostPerWheel',
        name: 'compCostPerWheel',
        id: 'compCostPerWheel',
        type: 'tel',
        required: true,
        currency: true,
        decimal: 2
      }, {
        label: 'cosavingsCompInput2PlaceHolder',
        model: 'compLaborBurdenCostPerHour',
        name: 'compLaborBurdenCostPerHour',
        id: 'compLaborBurdenCostPerHour',
        type: 'tel',
        required: true,
        currency: true,
        decimal: 2
      }, {
        label: 'cosavingsCompInput3PlaceHolder',
        model: 'compSecondsPerChangeover',
        name: 'compSecondsPerChangeover',
        id: 'compSecondsPerChangeover',
        type: 'tel',
        required: true,
        currency: false,
        decimal: 0
      }, {
        label: 'cosavingsThreeMInput1PlaceHolder',
        model: 'tMCostPerWheel',
        name: 'tMCostPerWheel',
        id: 'tMCostPerWheel',
        type: 'tel',
        required: true,
        currency: true,
        decimal: 2
      }],

      button: [{
        eventType: 'goBack',
        label: 'cosavingsBackButtonText',
        css: ''
      }, {
        eventType: 'reset',
        label: 'cosavingsResetButtonText',
        css: 'reset-button'
      }, {
        eventType: 'gotoNext',
        label: 'cosavingsNextButtonText',
        css: ''
      }]
    };

  }
];
