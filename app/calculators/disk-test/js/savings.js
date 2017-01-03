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

    // because e.g. calculator.cutOff.compNoOfCuts
    $scope.calcBase = $scope.calculator.diskTest;

    // Forms
    $scope.forms = {};
    $scope.fieldInvalid = function(form, input) {
      return $scope.forms[form][input.name].$invalid && !$scope.forms[form][input.name].$pristine;
    };

    // Navigation
    $scope.navigation = {};

    // Reset values
    $scope.navigation.reset = function() {
      $scope.calculator.diskTest.compCostPerDisk = null;
      $scope.calculator.diskTest.compBurdenRatePerHour = null;
      $scope.calculator.diskTest.compSecondsPerChangeover = null;
      $scope.calculator.diskTest.compAnnualSpendPerYear = null;

      $scope.calculator.diskTest.threeMCostPerDisk = null;
    };

    // Backward navigation
    $scope.navigation.goBack = function() {
      CalculatorService.saveCalculator($scope.calculator);
      $state.go('3m-asd-calc.disk-test-performance');
    };

    // Forward navigation
    $scope.navigation.gotoNext = function(form) {
      if ($scope.forms[form].$valid) {
        CalculatorService.saveCalculator($scope.calculator);
        $state.go('3m-asd-calc.disk-test-results');
      }
    };

    // Inputs
    $scope.calc = {
      id: 'diskTest',
      key: 'disk-test',
      name: 'dtcalculatorName',
      title: 'dtsavingsTitle',
      form: 'savingsInputForm',

      cols: [{
        title: 'dtsavingsCompetitorTitle',
        label: 'competitorProduct',
        css: 'competitor-list',
        inputs: [0, 1, 2, 3]
      }, {
        title: 'dtsavingsThreeMTitle',
        label: 'threeMProduct',
        css: 'client-list',
        inputs: [4]
      }],

      input: [{
        label: 'dtsavingsCompInput1PlaceHolder',
        model: 'compCostPerDisk',
        name: 'compCostPerDisk',
        id: 'compCostPerDisk',
        type: 'tel',
        required: true,
        currency: true,
        decimal: 2
      }, {
        label: 'dtsavingsCompInput2PlaceHolder',
        model: 'compBurdenRatePerHour',
        name: 'compBurdenRatePerHour',
        id: 'compBurdenRatePerHour',
        type: 'tel',
        required: true,
        currency: true,
        decimal: 2
      }, {
        label: 'dtsavingsCompInput3PlaceHolder',
        model: 'compSecondsPerChangeover',
        name: 'compSecondsPerChangeover',
        id: 'compSecondsPerChangeover',
        type: 'tel',
        required: true,
        currency: false,
        decimal: 0
      }, {
        label: 'dtsavingsCompInput4PlaceHolder',
        model: 'compAnnualSpendPerYear',
        name: 'compAnnualSpendPerYear',
        id: 'compAnnualSpendPerYear',
        type: 'tel',
        required: true,
        currency: true,
        decimal: 0
      }, {
        label: 'dtsavingsThreeMInput1PlaceHolder',
        model: 'threeMCostPerDisk',
        name: 'threeMCostPerDisk',
        id: 'threeMCostPerDisk',
        type: 'tel',
        required: true,
        currency: true,
        decimal: 2
      }],

      button: [{
        eventType: 'goBack',
        label: 'dtsavingsBackButtonText',
        css: ''
      }, {
        eventType: 'reset',
        label: 'dtsavingsResetButtonText',
        css: 'reset-button'
      }, {
        eventType: 'gotoNext',
        label: 'cosavingsNextButtonText',
        css: ''
      }]
    };

  }
];
