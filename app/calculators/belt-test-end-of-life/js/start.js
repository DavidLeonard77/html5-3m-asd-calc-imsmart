'use strict';

module.exports = [
  '$state',
  '$scope',
  '$rootScope',
  '$ionicPopup',
  'CalculatorService',
  'StorageService',
  'ConfigService',
  'PDFService',

  function(
    $state,
    $scope,
    $rootScope,
    $ionicPopup,
    CalculatorService,
    StorageService,
    ConfigService,
    PDFService
  ) {

    // Configurations
    $scope.config = ConfigService.getBeltTestConfigs();

    // Local storage access
    $scope.calculator = CalculatorService.calculator();
    $scope.calculator.beltTest = {};

    PDFService.compileHTML($scope, {
      templatePath: 'templates/report.html'
    }).then(function(result) {
      console.log(result);
    }, function() {});
    PDFService.compileHTML($scope, {
      templatePath: 'framework/templates/report.html'
    }).then(function(result) {
      console.log(result);
    }, function() {});

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
        $state.go('3m-asd-calc.belt-test-end-of-life-performance');
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

            $scope.calculator.beltTest = {};
            CalculatorService.saveCalculator($scope.calculator);

            $rootScope.isPDFReady = false;
          }
        }]
      });
    };


    // Inputs
    $scope.calc = {
      id: 'beltTest',
      key: 'belt-test-end-of-life',
      name: 'calculatorName',
      title: 'startParagraphTitle',
      intro: 'startParagraph',
      disclaimer: 'startDisclaimerText',

      form: 'startInputForm',

      inputs: [0, 1],

      input: [{
        label: 'startInput1PlaceHolder',
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
        label: 'startClearButtonText',
        css: 'clear-button'
      }, {
        type: 'submit',
        eventType: 'gotoNext',
        label: 'startNextButtonText',
        css: ''
      }]
    };

  }
];
