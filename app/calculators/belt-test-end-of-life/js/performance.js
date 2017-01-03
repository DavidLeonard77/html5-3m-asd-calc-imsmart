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
      $scope.calculator.beltTest.competitorPartsPerHour = null;
      $scope.calculator.beltTest.competitorPartsPerBelt = null;
      $scope.calculator.beltTest.threeMPartsPerHour = null;
      $scope.calculator.beltTest.threeMPartsPerBelt = null;
    };

    // Backward navigation
    $scope.navigation.goBack = function() {
      CalculatorService.saveCalculator($scope.calculator);
      $state.go('3m-asd-calc.belt-test-end-of-life-start');
    };

    // Forward navigation
    $scope.navigation.gotoNext = function(form) {
      if ($scope.forms[form].$valid) {
        CalculatorService.saveCalculator($scope.calculator);
        $state.go('3m-asd-calc.belt-test-end-of-life-savings');
      }
    };

    // Inputs
    $scope.calc = {
      id: 'beltTest',
      key: 'belt-test-end-of-life',
      name: 'calculatorName',
      title: 'performTitle',
      form: 'performanceInputForm',

      cols: [{
        title: 'performCompetitorTitle',
        label: 'competitorProduct',
        css: 'competitor-list',
        inputs: [0, 1]
      }, {
        title: 'performThreeMTitle',
        label: 'threeMProduct',
        css: 'client-list',
        inputs: [2, 3]
      }],

      input: [{
        label: 'performCompInput1PlaceHolder',
        model: 'competitorPartsPerHour',
        name: 'cpph',
        id: 'cpph',
        type: 'tel',
        required: true,
        currency: false,
        decimal: 0
      }, {
        label: 'performCompInput2PlaceHolder',
        model: 'competitorPartsPerBelt',
        name: 'cppb',
        id: 'cppb',
        type: 'tel',
        required: true,
        currency: false,
        decimal: 0
      }, {
        label: 'performThreeMInput1PlaceHolder',
        model: 'threeMPartsPerHour',
        name: 'tpph',
        id: 'tpph',
        type: 'tel',
        required: true,
        currency: false,
        decimal: 0
      }, {
        label: 'performThreeMInput2PlaceHolder',
        model: 'threeMPartsPerBelt',
        name: 'tppb',
        id: 'tppb',
        type: 'tel',
        required: true,
        currency: false,
        decimal: 0
      }],

      button: [{
        type: 'button',
        eventType: 'goBack',
        label: 'performBackButtonText',
        css: ''
      }, {
        type: 'button',
        eventType: 'reset',
        label: 'performResetButtonText',
        css: 'reset-button'
      }, {
        type: 'submit',
        eventType: 'gotoNext',
        label: 'performNextButtonText',
        css: ''
      }]
    };

  }
];
