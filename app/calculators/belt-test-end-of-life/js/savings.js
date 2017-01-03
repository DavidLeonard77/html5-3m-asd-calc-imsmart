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
      $scope.calculator.beltTest.competitorCostPerBelt = null;
      $scope.calculator.beltTest.competitorBurdenRatePerHour = null;
      $scope.calculator.beltTest.competitorChangeOverTime = null;
      $scope.calculator.beltTest.competitorAnnualSpend = null;
      $scope.calculator.beltTest.threeMCostPerBelt = null;
    };

    // Backward navigation
    $scope.navigation.goBack = function() {
      CalculatorService.saveCalculator($scope.calculator);
      $state.go('3m-asd-calc.belt-test-end-of-life-performance');
    };

    // Forward navigation
    $scope.navigation.gotoNext = function(form) {
      if ($scope.forms[form].$valid) {
        CalculatorService.saveCalculator($scope.calculator);
        $state.go('3m-asd-calc.belt-test-end-of-life-results');
      }
    };

    // Inputs
    $scope.calc = {
      id: 'beltTest',
      key: 'belt-test-end-of-life',
      name: 'calculatorName',
      title: 'savingsTitle',
      form: 'savingsInputForm',

      cols: [{
        title: 'savingsCompetitorTitle',
        label: 'competitorProduct',
        css: 'competitor-list',
        inputs: [0, 1, 2, 3]
      }, {
        title: 'performThreeMTitle',
        label: 'threeMProduct',
        css: 'client-list',
        inputs: [4]
      }],

      input: [{
        label: 'savingsCompInput1PlaceHolder',
        model: 'competitorCostPerBelt',
        name: 'ccpb',
        id: 'ccpb',
        type: 'tel',
        required: true,
        currency: true,
        decimal: 2
      }, {
        label: 'savingsCompInput2PlaceHolder',
        model: 'competitorBurdenRatePerHour',
        name: 'cbrph',
        id: 'cbrph',
        type: 'tel',
        required: true,
        currency: true,
        decimal: 2
      }, {
        label: 'savingsCompInput3PlaceHolder',
        model: 'competitorChangeOverTime',
        name: 'ccot',
        id: 'ccot',
        type: 'tel',
        required: true,
        currency: false,
        decimal: 0
      }, {
        label: 'savingsCompInput4PlaceHolder',
        model: 'competitorAnnualSpend',
        name: 'casod',
        id: 'casod',
        type: 'tel',
        required: true,
        currency: true,
        decimal: 2
      }, {
        label: 'savingsThreeMInput1PlaceHolder',
        model: 'threeMCostPerBelt',
        name: 'tcpb',
        id: 'tcpb',
        type: 'tel',
        required: true,
        currency: true,
        decimal: 2
      }],

      button: [{
        eventType: 'goBack',
        label: 'savingsBackButtonText',
        css: ''
      }, {
        eventType: 'reset',
        label: 'savingsResetButtonText',
        css: 'reset-button'
      }, {
        eventType: 'gotoNext',
        label: 'savingsNextButtonText',
        css: ''
      }]
    };

  }
];
