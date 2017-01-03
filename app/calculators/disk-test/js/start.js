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
        $state.go('3m-asd-calc.disk-test-performance');
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

            $scope.calculator.diskTest.competitorProduct = null;
            $scope.calculator.diskTest.threeMProduct = null;

            $scope.calculator.diskTest.competitorTimeToProcessPart = null;
            $scope.calculator.diskTest.competitorPartsPerDisk = null;
            $scope.calculator.diskTest.threeMTimeToProcessPart = null;
            $scope.calculator.diskTest.threeMPartsPerDisk = null;
            $scope.calculator.diskTest.compCostPerDisk = null;
            $scope.calculator.diskTest.compBurdenRatePerHour = null;
            $scope.calculator.diskTest.compSecondsPerChangeover = null;
            $scope.calculator.diskTest.compAnnualSpendPerYear = null;
            $scope.calculator.diskTest.threeMCostPerDisk = null;
            $scope.calculator.diskTest.abrasiveSavingsPercentage = null;
            $scope.calculator.diskTest.laborSavingsPercentage = null;
            $scope.calculator.diskTest.materialsSavings = null;
            $scope.calculator.diskTest.laborSavings = null;
            $scope.calculator.diskTest.changeoverSavings = null;
            $scope.calculator.diskTest.changeoverSavingsPercentage = null;

            $scope.calculator.diskTest.totalAnnualSavings = null;
            $scope.calculator.diskTest.totalAnnualSavingsPercentage = null;

            $rootScope.isPDFReady = false;
            CalculatorService.saveCalculator($scope.calculator);
          }
        }]
      });
    };


    // Inputs
    $scope.calc = {
      id: 'diskTest',
      key: 'disk-test',
      name: 'dtcalculatorName',
      title: 'dtstartParagraphTitle',
      intro: 'dtstartParagraph',
      disclaimer: 'dtstartDisclaimerText',

      form: 'startInputForm',

      inputs: [0, 1],

      input: [{
        label: 'dtstartInput1PlaceHolder',
        model: 'threeMProduct',
        name: 'threeM',
        id: 'threeM',
        type: 'text',
        required: true
      }, {
        label: 'dtstartInput2PlaceHolder',
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
        label: 'dtstartClearButtonText',
        css: 'clear-button'
      }, {
        type: 'submit',
        eventType: 'gotoNext',
        label: 'dtstartNextButtonText',
        css: ''
      }]
    };

  }
];
