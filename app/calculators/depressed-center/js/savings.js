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
      $scope.calculator.depCent.compcostPerWheel = null;
      $scope.calculator.depCent.compLabourCostPerHour = null;
      $scope.calculator.depCent.compSecondsPerChangeover = null;
      $scope.calculator.depCent.compCurrentPartsProducedPerYear = null;
      $scope.calculator.depCent.tMcostPerWheel = null;
    };

    // Backward navigation
    $scope.navigation.goBack = function() {
      CalculatorService.saveCalculator($scope.calculator);
      $state.go('3m-asd-calc.depressed-center-performance');
    };

    // Forward navigation
    $scope.navigation.gotoNext = function(form) {
      if ($scope.forms[form].$valid) {
        CalculatorService.saveCalculator($scope.calculator);
        $state.go('3m-asd-calc.depressed-center-results');
      }
    };

    // Inputs
    $scope.calc = {
      id: 'depCent',
      key: 'depressed-center',
      name: 'dccalculatorName',
      title: 'dcsavingsTitle',
      form: 'savingsInputForm',

      cols: [{
        title: 'dcsavingsCompetitorTitle',
        label: 'competitorProduct',
        css: 'competitor-list',
        inputs: [0, 1, 2, 3]
      }, {
        title: 'dcsavingsThreeMTitle',
        label: 'threeMProduct',
        css: 'client-list',
        inputs: [4]
      }],

      input: [{
        label: 'dcsavingsCompInput1PlaceHolder',
        model: 'compcostPerWheel',
        name: 'compcostPerWheel',
        id: 'compcostPerWheel',
        type: 'tel',
        required: true,
        currency: true,
        decimal: 2
      }, {
        label: 'dcsavingsCompInput2PlaceHolder',
        model: 'compLabourCostPerHour',
        name: 'compLabourCostPerHour',
        id: 'compLabourCostPerHour',
        type: 'tel',
        required: true,
        currency: true,
        decimal: 0
      }, {
        label: 'dcsavingsCompInput3PlaceHolder',
        model: 'compSecondsPerChangeover',
        name: 'compSecondsPerChangeover',
        id: 'compSecondsPerChangeover',
        type: 'tel',
        required: true,
        currency: false,
        decimal: 0
      }, {
        label: 'dcsavingsCompInput4PlaceHolder',
        model: 'compCurrentPartsProducedPerYear',
        name: 'compCurrentPartsProducedPerYear',
        id: 'compCurrentPartsProducedPerYear',
        type: 'tel',
        required: true,
        currency: true,
        decimal: 0
      }, {
        label: 'dcsavingsThreeMInput1PlaceHolder',
        model: 'tMcostPerWheel',
        name: 'tMcostPerWheel',
        id: 'tMcostPerWheel',
        type: 'tel',
        required: true,
        currency: true,
        decimal: 2
      }],

      button: [{
        eventType: 'goBack',
        label: 'dcsavingsBackButtonText',
        css: ''
      }, {
        eventType: 'reset',
        label: 'dcsavingsResetButtonText',
        css: 'reset-button'
      }, {
        eventType: 'gotoNext',
        label: 'dcsavingsNextButtonText',
        css: ''
      }]
    };

  }
];
