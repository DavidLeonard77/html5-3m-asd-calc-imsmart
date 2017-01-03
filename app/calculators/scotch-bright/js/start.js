'use strict';

module.exports = [
  '$state',
  '$scope',
  '$rootScope',
  '$ionicPopup',
  'CalculatorService',
  'StorageService',
  'ConfigService',

  function(
    $state,
    $scope,
    $rootScope,
    $ionicPopup,
    CalculatorService,
    StorageService,
    ConfigService
  ) {

    // Configurations
    $scope.config = ConfigService.getBeltTestConfigs();

    // Local storage access
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

    // Settings popup
    $scope.navigation.goSettings = function() {
      $scope.settingsPopup = $ionicPopup.show({
        templateUrl: 'framework/templates/settings.html',
        scope: $scope,
        cssClass: 'personal-settings-popup'
      });
    };

    // Forward navigation
    $scope.navigation.gotoNext = function(form) {
      if ($scope.forms[form].$valid) {
        CalculatorService.saveCalculator($scope.calculator);
        $state.go('3m-asd-calc.scotch-bright-performance');
      }
    };

    // Clear all popup
    $scope.navigation.clearAll = function() {

      $ionicPopup.confirm({
        title: $scope.config.clearAllTitle,
        template: $scope.config.clearAllMessage,
        cssClass: 'alert-popup',
        buttons: [{
          text: $scope.config.clearAllCancel,
          type: 'button-positive',
          onTap: function() {}
        }, {
          text: $scope.config.clearAllConfirm,
          type: 'button-default',
          onTap: function() {

            $scope.calculator.scoBri.competitorProduct = null;
            $scope.calculator.scoBri.threeMProduct = null;

            $scope.calculator.scoBri.compNewWheelDiaInches = null;
            $scope.calculator.scoBri.compTestWheelDiaStartInches = null;
            $scope.calculator.scoBri.compTestWheelDiaEndInches = null;
            $scope.calculator.scoBri.compWheelWidthInches = null;
            $scope.calculator.scoBri.compCoreIdSizeInches = null;
            $scope.calculator.scoBri.compNumPartsTest = null;
            $scope.calculator.scoBri.compTestTimeMinutes = null;

            $scope.calculator.scoBri.tMNewWheelDiaInches = null;
            $scope.calculator.scoBri.tMTestWheelDiaStartInches = null;
            $scope.calculator.scoBri.tMTestWheelDiaEndInches = null;
            $scope.calculator.scoBri.tMWheelWidthInches = null;
            $scope.calculator.scoBri.tMCoreIdSizeInches = null;
            $scope.calculator.scoBri.tMNumPartsTest = null;
            $scope.calculator.scoBri.tMTestTimeMinutes = null;

            $scope.calculator.scoBri.compCostPerWheel = null;
            $scope.calculator.scoBri.compPartsPerYear = null;
            $scope.calculator.scoBri.compBurdenRatePerHour = null;
            $scope.calculator.scoBri.compChangeoverTimeMinutes = null;
            $scope.calculator.scoBri.compTimeProcessPart = null;
            $scope.calculator.scoBri.compPartsPerWheel = null;
            $scope.calculator.scoBri.compAnnualSpendPYOnDiscs = null;
            $scope.calculator.scoBri.compAnnualSpendPYOnDiscs = null;

            $scope.calculator.scoBri.tMCostPerWheel = null;
            $scope.calculator.scoBri.tMTimeProcessPart = null;
            $scope.calculator.scoBri.tMPartsPerWheel = null;

            $rootScope.isPDFReady = false;
            CalculatorService.saveCalculator($scope.calculator);
          }
        }]
      });
    };

    // Inputs
    $scope.calc = {
      id: 'scoBri',
      key: 'scotch-bright',
      name: 'sbcalculatorName',
      title: 'sbstartParagraphTitle',
      intro: 'sbstartParagraph',
      disclaimer: 'sbstartDisclaimerText',

      form: 'startInputForm',

      inputs: [0, 1],

      input: [{
        label: 'sbstartInput1PlaceHolder',
        model: 'threeMProduct',
        name: 'threeM',
        id: 'threeM',
        type: 'text',
        required: true
      }, {
        label: 'startInput2PlaceHolder',
        model: 'competitorProduct',
        name: 'competitor',
        id: 'competitor',
        type: 'text',
        required: true
      }],

      button: [{
        type: 'button',
        eventType: 'goSettings',
        label: '',
        css: 'button icon ion-gear-b button-clear button-positive settings-button'
      }, {
        type: 'button',
        eventType: 'clearAll',
        label: 'sbstartClearButtonText',
        css: 'clear-button'
      }, {
        type: 'submit',
        eventType: 'gotoNext',
        label: 'sbstartNextButtonText',
        css: ''
      }]
    };

  }
];
