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
      $scope.calculator.cutOff.compNoOfCuts = null;
      $scope.calculator.cutOff.compSecondsToCut = null;
      $scope.calculator.cutOff.compCurrentPartsProducedPerYear = null;
      $scope.calculator.cutOff.tMNoOfCuts = null;
      $scope.calculator.cutOff.tMSecondsToCut = null;
    };

    // Backward navigation
    $scope.navigation.goBack = function() {
      CalculatorService.saveCalculator($scope.calculator);
      $state.go('3m-asd-calc.cut-off-wheel-start');
    };

    // Forward navigation
    $scope.navigation.gotoNext = function(form) {
      if ($scope.forms[form].$valid) {
        CalculatorService.saveCalculator($scope.calculator);
        $state.go('3m-asd-calc.cut-off-wheel-savings');
      }
    };

    // Inputs
    $scope.calc = {
      id: 'cutOff',
      key: 'cut-off-wheel',
      name: 'cocalculatorName',
      title: 'coperformTitle',
      form: 'performanceInputForm',

      cols: [{
        title: 'coperformCompetitorTitle',
        label: 'competitorProduct',
        css: 'competitor-list',
        inputs: [0, 1, 2]
      }, {
        title: 'coperformThreeMTitle',
        label: 'threeMProduct',
        css: 'client-list',
        inputs: [3, 4]
      }],

      input: [{
        label: 'coperformCompInput1PlaceHolder',
        model: 'compNoOfCuts',
        name: 'compNoOfCuts',
        id: 'compNoOfCuts',
        type: 'tel',
        required: true,
        currency: false,
        decimal: 0
      }, {
        label: 'coperformCompInput2PlaceHolder',
        model: 'compSecondsToCut',
        name: 'compSecondsToCut',
        id: 'compSecondsToCut',
        type: 'tel',
        required: true,
        currency: false,
        decimal: 0
      }, {
        label: 'coperformCompInput4PlaceHolder',
        model: 'compCurrentPartsProducedPerYear',
        name: 'compCurrentPartsProducedPerYear',
        id: 'compCurrentPartsProducedPerYear',
        type: 'tel',
        required: true,
        currency: false,
        decimal: 0
      }, {
        label: 'coperformThreeMInput1PlaceHolder',
        model: 'tMNoOfCuts',
        name: 'tMNoOfCuts',
        id: 'tMNoOfCuts',
        type: 'tel',
        required: true,
        currency: false,
        decimal: 0
      }, {
        label: 'coperformThreeMInput2PlaceHolder',
        model: 'tMSecondsToCut',
        name: 'tMSecondsToCut',
        id: 'tMSecondsToCut',
        type: 'tel',
        required: true,
        currency: false,
        decimal: 0
      }],

      button: [{
        type: 'button',
        eventType: 'goBack',
        label: 'coperformBackButtonText',
        css: ''
      }, {
        type: 'button',
        eventType: 'reset',
        label: 'coperformResetButtonText',
        css: 'reset-button'
      }, {
        type: 'submit',
        eventType: 'gotoNext',
        label: 'coperformNextButtonText',
        css: ''
      }]
    };

  }
];
