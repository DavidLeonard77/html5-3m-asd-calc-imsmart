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

    // Configurations
    $scope.config = ConfigService.getBeltTestConfigs();

    // Storage access
    $scope.calculator = CalculatorService.calculator();

    // Forms
    $scope.forms = {};

    // Validation
    $scope.validation = {};
    $scope.validation.fieldInvalid = function(form, input) {
      return $scope.forms[form][input.name].$invalid && !$scope.forms[form][input.name].$pristine;
    };
    $scope.validation.formInvalid = function() {
      return $scope.forms[$scope.calc.form].$invalid;
    };

    // Navigation
    $scope.navigation = {};

    // Reset values
    $scope.navigation.reset = function() {
      $scope.calculator.diskTest.competitorTimeToProcessPart = null;
      $scope.calculator.diskTest.threeMTimeToProcessPart = null;
      $scope.calculator.diskTest.competitorPartsPerDisk = null;
      $scope.calculator.diskTest.threeMPartsPerDisk = null;
    };

    // Backward navigation
    $scope.navigation.goBack = function() {
      CalculatorService.saveCalculator($scope.calculator);
      $state.go('3m-asd-calc.disk-test-start');
    };

    // Forward navigation
    $scope.navigation.gotoNext = function(form) {
      if ($scope.forms[form].$valid) {
        CalculatorService.saveCalculator($scope.calculator);
        $state.go('3m-asd-calc.disk-test-savings');
      }
    };

    // Inputs
    $scope.calc = {
      id: 'diskTest',
      key: 'disk-test',
      name: 'dtcalculatorName',
      title: 'dtperformTitle',
      form: 'performanceInputForm',

      cols: [{
        title: 'dtperformCompetitorTitle',
        label: 'competitorProduct',
        css: 'competitor-list',
        inputs: [0, 1]
      }, {
        title: 'dtperformThreeMTitle',
        label: 'threeMProduct',
        css: 'client-list',
        inputs: [2, 3]
      }],

      input: [{
        label: 'dtperformCompInput1PlaceHolder',
        model: 'competitorTimeToProcessPart',
        name: 'competitorTimeToProcessPart',
        id: 'competitorTimeToProcessPart',
        type: 'tel',
        required: true,
        currency: false,
        decimal: 0
      }, {
        label: 'dtperformCompInput2PlaceHolder',
        model: 'competitorPartsPerDisk',
        name: 'competitorPartsPerDisk',
        id: 'competitorPartsPerDisk',
        type: 'tel',
        required: true,
        currency: false,
        decimal: 0
      }, {
        label: 'dtperformThreeMInput1PlaceHolder',
        model: 'threeMTimeToProcessPart',
        name: 'threeMTimeToProcessPart',
        id: 'threeMTimeToProcessPart',
        type: 'tel',
        required: true,
        currency: false,
        decimal: 0
      }, {
        label: 'dtperformThreeMInput2PlaceHolder',
        model: 'threeMPartsPerDisk',
        name: 'threeMPartsPerDisk',
        id: 'threeMPartsPerDisk',
        type: 'tel',
        required: true,
        currency: false,
        decimal: 0
      }],

      button: [{
        type: 'button',
        eventType: 'goBack',
        label: 'dtperformBackButtonText',
        css: ''
      }, {
        type: 'button',
        eventType: 'reset',
        label: 'dtperformResetButtonText',
        css: 'reset-button'
      }, {
        type: 'submit',
        eventType: 'gotoNext',
        label: 'dtperformNextButtonText',
        css: ''
      }]
    };

  }
];
