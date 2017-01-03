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
      $scope.calculator.scoBri.compCostPerWheel = null;
      $scope.calculator.scoBri.compPartsPerYear = null;
      $scope.calculator.scoBri.compBurdenRatePerHour = null;
      $scope.calculator.scoBri.compChangeoverTimeMinutes = null;
      $scope.calculator.scoBri.compAnnualSpendPYOnDiscs = null;
      $scope.calculator.scoBri.compAnnualSpendPYOnDiscs = null;

      $scope.calculator.scoBri.tMCostPerWheel = null;
    };

    // Backward navigation
    $scope.navigation.goBack = function() {
      CalculatorService.saveCalculator($scope.calculator);
      $state.go('3m-asd-calc.scotch-bright-performance');
    };

    // Forward navigation
    $scope.navigation.gotoNext = function(form) {
      if ($scope.forms[form].$valid) {
        CalculatorService.saveCalculator($scope.calculator);
        $state.go('3m-asd-calc.scotch-bright-results');
      }
    };

    // Inputs
    $scope.calc = {
      id: 'scoBri',
      key: 'scotch-bright',
      name: 'sbcalculatorName',
      title: 'sbsavingsTitle',
      form: 'savingsInputForm',

      cols: [{
        title: 'sbsavingsCompetitorTitle',
        label: 'competitorProduct',
        css: 'competitor-list',
        inputs: [0, 1, 2, 3]
      }, {
        title: 'sbsavingsThreeMTitle',
        label: 'threeMProduct',
        css: 'client-list',
        inputs: [4]
      }],

      input: [{
        label: 'sbsavingsCompInput1PlaceHolder',
        model: 'compCostPerWheel',
        name: 'ccpw',
        id: 'ccpw',
        type: 'tel',
        required: true,
        currency: true,
        decimal: 2
      }, {
        label: 'sbsavingsCompInput2PlaceHolder',
        model: 'compBurdenRatePerHour',
        name: 'cbrph',
        id: 'cbrph',
        type: 'tel',
        required: true,
        currency: true,
        decimal: 2
      }, {
        label: 'sbsavingsCompInput3PlaceHolder',
        model: 'compChangeoverTimeMinutes',
        name: 'cctm',
        id: 'cctm',
        type: 'tel',
        required: true,
        currency: false,
        decimal: 0
      }, {
        label: 'sbsavingsCompInput4PlaceHolder',
        model: 'compAnnualSpendPYOnDiscs',
        name: 'caspyod',
        id: 'caspyod',
        type: 'tel',
        required: true,
        currency: true,
        decimal: 0
      }, {
        label: 'sbsavingsThreeMInput1PlaceHolder',
        model: 'tMCostPerWheel',
        name: 'tcpw',
        id: 'tcpw',
        type: 'tel',
        required: true,
        currency: true,
        decimal: 2
      }],

      button: [{
        eventType: 'goBack',
        label: 'sbsavingsBackButtonText',
        css: ''
      }, {
        eventType: 'reset',
        label: 'sbsavingsResetButtonText',
        css: 'reset-button'
      }, {
        eventType: 'gotoNext',
        label: 'sbsavingsNextButtonText',
        css: ''
      }]
    };

  }
];
