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
      $scope.calculator.depCent.compWheelStartWeight = null;
      $scope.calculator.depCent.compNumberOfParts = null;
      $scope.calculator.depCent.compSecondsToGrind = null;
      $scope.calculator.depCent.compWheelEndWeight = null;
      $scope.calculator.depCent.compUsablePercentageofWheeltoEndofLife = null;
      $scope.calculator.depCent.tMWheelStartWeight = null;
      $scope.calculator.depCent.tMNumberOfParts = null;
      $scope.calculator.depCent.tMSecondsToGrind = null;
      $scope.calculator.depCent.tMWheelEndWeight = null;
    };

    // Backward navigation
    $scope.navigation.goBack = function() {
      CalculatorService.saveCalculator($scope.calculator);
      $state.go('3m-asd-calc.depressed-center-start');
    };

    // Forward navigation
    $scope.navigation.gotoNext = function(form) {
      if ($scope.forms[form].$valid) {
        CalculatorService.saveCalculator($scope.calculator);
        $state.go('3m-asd-calc.depressed-center-savings');
      }
    };

    // Inputs
    $scope.calc = {
      id: 'depCent',
      key: 'depressed-center',
      name: 'dccalculatorName',
      title: 'dcperformTitle',
      form: 'performanceInputForm',

      cols: [{
        title: 'dcperformCompetitorTitle',
        label: 'competitorProduct',
        css: 'competitor-list',
        inputs: [0, 1, 2, 3, 4]
      }, {
        title: 'dcperformThreeMTitle',
        label: 'threeMProduct',
        css: 'client-list',
        inputs: [5, 6, 7, 8]
      }],

      input: [{
        label: 'dcperformCompInput1PlaceHolder',
        model: 'compWheelStartWeight',
        name: 'compWheelStartWeight',
        id: 'compWheelStartWeight',
        type: 'tel',
        required: true,
        currency: false,
        decimal: 0
      }, {
        label: 'dcperformCompInput2PlaceHolder',
        model: 'compNumberOfParts',
        name: 'compNumberOfParts',
        id: 'compNumberOfParts',
        type: 'tel',
        required: true,
        currency: false,
        decimal: 0
      }, {
        label: 'dcperformCompInput3PlaceHolder',
        model: 'compSecondsToGrind',
        name: 'compSecondsToGrind',
        id: 'compSecondsToGrind',
        type: 'tel',
        required: true,
        currency: false,
        decimal: 0
      }, {
        label: 'dcperformCompInput4PlaceHolder',
        model: 'compWheelEndWeight',
        name: 'compWheelEndWeight',
        id: 'compWheelEndWeight',
        type: 'tel',
        required: true,
        currency: false,
        decimal: 0
      }, {
        label: 'dcperformCompInput5PlaceHolder',
        model: 'compUsablePercentageofWheeltoEndofLife',
        name: 'compUsablePercentageofWheeltoEndofLife',
        id: 'compUsablePercentageofWheeltoEndofLife',
        type: 'tel',
        required: true,
        currency: false,
        decimal: 0
      }, {
        label: 'dcperformThreeMInput1PlaceHolder',
        model: 'tMWheelStartWeight',
        name: 'tMWheelStartWeight',
        id: 'tMWheelStartWeight',
        type: 'tel',
        required: true,
        currency: false,
        decimal: 0
      }, {
        label: 'dcperformThreeMInput2PlaceHolder',
        model: 'tMNumberOfParts',
        name: 'tMNumberOfParts',
        id: 'tMNumberOfParts',
        type: 'tel',
        required: true,
        currency: false,
        decimal: 0
      }, {
        label: 'dcperformThreeMInput3PlaceHolder',
        model: 'tMSecondsToGrind',
        name: 'tMSecondsToGrind',
        id: 'tMSecondsToGrind',
        type: 'tel',
        required: true,
        currency: false,
        decimal: 0
      }, {
        label: 'dcperformThreeMInput4PlaceHolder',
        model: 'tMWheelEndWeight',
        name: 'tMWheelEndWeight',
        id: 'tMWheelEndWeight',
        type: 'tel',
        required: true,
        currency: false,
        decimal: 0
      }],

      button: [{
        type: 'button',
        eventType: 'goBack',
        label: 'dcperformBackButtonText',
        css: ''
      }, {
        type: 'button',
        eventType: 'reset',
        label: 'dcperformResetButtonText',
        css: 'reset-button'
      }, {
        type: 'submit',
        eventType: 'gotoNext',
        label: 'dcperformNextButtonText',
        css: ''
      }]
    };

  }
];
