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
        $state.go('3m-asd-calc.depressed-center-performance');
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

            $scope.calculator.depCent.dcCompetitorProduct = null;
            $scope.calculator.depCent.dcThreeMProduct = null;

            $scope.calculator.depCent.compWheelStartWeight = null;
            $scope.calculator.depCent.compNumberOfParts = null;
            $scope.calculator.depCent.compSecondsToGrind = null;
            $scope.calculator.depCent.compWheelEndWeight = null;
            $scope.calculator.depCent.compUsablePercentageofWheeltoEndofLife = null;
            $scope.calculator.depCent.compCurrentPartsProducedPerYear = null;
            $scope.calculator.depCent.compUnitCostforPart = null;
            $scope.calculator.depCent.compMarginonFinishedPart = null;

            $scope.calculator.depCent.tMWheelStartWeight = null;
            $scope.calculator.depCent.tMNumberOfParts = null;
            $scope.calculator.depCent.tMSecondsToGrind = null;
            $scope.calculator.depCent.tMWheelEndWeight = null;
            $scope.calculator.depCent.tMcostPerWheel = null;

            $scope.calculator.depCent.compLabourCostPerHour = null;
            $scope.calculator.depCent.compSecondsPerChangeover = null;
            $scope.calculator.depCent.compcostPerWheel = null;

            $rootScope.isPDFReady = false;
            CalculatorService.saveCalculator($scope.calculator);
          }
        }]
      });
    };

    // Inputs
    $scope.calc = {
      id: 'depCent',
      key: 'depressed-center',
      name: 'dccalculatorName',
      title: 'dcstartParagraphTitle',
      intro: 'dcstartParagraph',
      disclaimer: 'dcstartDisclaimerText',

      form: 'startInputForm',

      inputs: [0, 1],

      input: [{
        label: 'dcstartInput1PlaceHolder',
        model: 'threeMProduct',
        name: 'threeM',
        id: 'threeM',
        type: 'text',
        required: true
      }, {
        label: 'dcstartInput2PlaceHolder',
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
        label: 'dcstartClearButtonText',
        css: 'clear-button'
      }, {
        type: 'submit',
        eventType: 'gotoNext',
        label: 'dcstartNextButtonText',
        css: ''
      }]
    };

  }
];
