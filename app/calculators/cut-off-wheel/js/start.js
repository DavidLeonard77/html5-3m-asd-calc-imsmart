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
    $scope.calculator.cutOff = {};

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
        $state.go('3m-asd-calc.cut-off-wheel-performance');
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

            $scope.calculator.cutOff = {};
            CalculatorService.saveCalculator($scope.calculator);

            $rootScope.isPDFReady = false;
          }
        }]
      });
    };

    // Inputs
    $scope.calc = {
      id: 'cutOff',
      key: 'cut-off-wheel',
      name: 'cocalculatorName',
      title: 'costartParagraphTitle',
      intro: 'costartParagraph',
      disclaimer: 'costartDisclaimerText',

      form: 'startInputForm',

      inputs: [0, 1],

      input: [{
        label: 'costartInput1PlaceHolder',
        model: 'threeMProduct',
        name: 'threeM',
        id: 'threeM',
        type: 'text',
        required: true
      }, {
        label: 'costartInput2PlaceHolder',
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
        label: 'costartClearButtonText',
        css: 'clear-button'
      }, {
        type: 'submit',
        eventType: 'gotoNext',
        label: 'costartNextButtonText',
        css: ''
      }]
    };

  }
];
