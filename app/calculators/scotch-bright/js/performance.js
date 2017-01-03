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
      $scope.calculator.scoBri.compTimeProcessPart = null;
      $scope.calculator.scoBri.compPartsPerWheel = null;
      $scope.calculator.scoBri.compNumPartsTest = null;
      $scope.calculator.scoBri.compTestTimeMinutes = null;
      $scope.calculator.scoBri.tMTimeProcessPart = null;
      $scope.calculator.scoBri.tMPartsPerWheel = null;
      $scope.calculator.scoBri.tMNumPartsTest = null;
      $scope.calculator.scoBri.tMTestTimeMinutes = null;
    };

    // Backward navigation
    $scope.navigation.goBack = function() {
      CalculatorService.saveCalculator($scope.calculator);
      $state.go('3m-asd-calc.scotch-bright-start');
    };

    // Forward navigation
    $scope.navigation.gotoNext = function(form) {
      if ($scope.forms[form].$valid) {
        CalculatorService.saveCalculator($scope.calculator);
        $state.go('3m-asd-calc.scotch-bright-savings');
      }
    };

    // Inputs
    $scope.calc = {
      id: 'scoBri',
      key: 'scotch-bright',
      name: 'sbcalculatorName',
      title: 'sbperformTitle',
      form: 'performanceInputForm',

      cols: [{
        title: 'sbperformCompetitorTitle',
        label: 'competitorProduct',
        css: 'competitor-list',
        inputs: [0, 1]
      }, {
        title: 'sbperformThreeMTitle',
        label: 'threeMProduct',
        css: 'client-list',
        inputs: [2, 3]
      }],

      input: [{
        label: 'sbperformCompInput1PlaceHolder',
        model: 'compTimeProcessPart',
        name: 'ctpp',
        id: 'ctpp',
        type: 'tel',
        required: true,
        currency: false,
        decimal: 0
      }, {
        label: 'sbperformCompInput2PlaceHolder',
        model: 'compPartsPerWheel',
        name: 'cppw',
        id: 'cppw',
        type: 'tel',
        required: true,
        currency: false,
        decimal: 0
      }, {
        label: 'sbperformThreeMInput1PlaceHolder',
        model: 'tMTimeProcessPart',
        name: 'ttpp',
        id: 'ttpp',
        type: 'tel',
        required: true,
        currency: false,
        decimal: 0
      }, {
        label: 'sbperformThreeMInput2PlaceHolder',
        model: 'tMPartsPerWheel',
        name: 'tppw',
        id: 'tppw',
        type: 'tel',
        required: true,
        currency: false,
        decimal: 0
      }],

      button: [{
        type: 'button',
        eventType: 'goBack',
        label: 'sbperformBackButtonText',
        css: ''
      }, {
        type: 'button',
        eventType: 'reset',
        label: 'sbperformResetButtonText',
        css: 'reset-button'
      }, {
        type: 'submit',
        eventType: 'gotoNext',
        label: 'sbperformNextButtonText',
        css: ''
      }]
    };

  }
];
