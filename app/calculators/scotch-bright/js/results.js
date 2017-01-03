'use strict';

module.exports = [
  '$state',
  '$scope',
  '$rootScope',
  'CalculatorService',
  'StorageService',
  'ConfigService',

  function(
    $state,
    $scope,
    $rootScope,
    CalculatorService,
    StorageService,
    ConfigService
  ) {

    $scope.navigation = {};
    $scope.navigation.goBack = function() {
      CalculatorService.saveCalculator($scope.calculator);
      $state.go('3m-asd-calc.belt-test-end-of-life-savings');
    };

    function getCalculations() {

      $scope.calculator = CalculatorService.calculator();

      var compTimeProcessPart = parseFloat($scope.calculator.scoBri.compTimeProcessPart);
      var compCostPerWheel = parseFloat($scope.calculator.scoBri.compCostPerWheel);
      var compPartsPerWheel = parseFloat($scope.calculator.scoBri.compPartsPerWheel);
      var compBurdenRatePerHour = parseFloat($scope.calculator.scoBri.compBurdenRatePerHour);
      var compAnnualSpendPYOnDiscs = parseFloat($scope.calculator.scoBri.compAnnualSpendPYOnDiscs);
      var tmAnnualSpendPYOnDiscs = parseFloat($scope.calculator.scoBri.tmAnnualSpendPYOnDiscs);
      var compChangeoverTimeMinutes = parseFloat($scope.calculator.scoBri.compChangeoverTimeMinutes);
      var tMTimeProcessPart = parseFloat($scope.calculator.scoBri.tMTimeProcessPart);
      var tMCostPerWheel = parseFloat($scope.calculator.scoBri.tMCostPerWheel);
      var tMPartsPerWheel = parseFloat($scope.calculator.scoBri.tMPartsPerWheel);

      //Materials Test Outputs
      var compNoOfWheelsPY = compAnnualSpendPYOnDiscs / compCostPerWheel; //No. of wheels purchased per year (competitor)
      var compCostForWheelsPY = compNoOfWheelsPY * compCostPerWheel; //Cost for wheels per year (competitor)
      var tMNoOfWheelsPY = compNoOfWheelsPY * (compPartsPerWheel / tMPartsPerWheel); //No. of wheels purchased per year (3M)
      var tMCostForWheelsPY = tMNoOfWheelsPY * tMCostPerWheel; //Cost for wheels per year (3M)

      //Labor Test Outputs
      var compCostForLaborPP = compBurdenRatePerHour * (compTimeProcessPart / 3600); //Cost for labor per part (competitor)
      var compPartsPY = compNoOfWheelsPY * compPartsPerWheel; //Parts Per Year (competitor)
      var compCostForLaborPY = compCostForLaborPP * compPartsPY; //Cost for labor per year (competitor)
      var tMCostForLaborPP = compBurdenRatePerHour * (tMTimeProcessPart / 3600); //Cost for labor per part (3M)
      var tMPartsPY = tMNoOfWheelsPY * tMPartsPerWheel; //Parts Per Year (3M)
      var tMCostForLaborPY = tMCostForLaborPP * tMPartsPY; //Cost for labor per year (3M)

      //Changeover Test Outputs
      var compChangeoverTimePYMin = compChangeoverTimeMinutes * compNoOfWheelsPY; //Changeover time per year in minutes (competitor)
      var compCostForChangePY = (compChangeoverTimePYMin / 60) * compBurdenRatePerHour; //Cost for change per year (competitor)
      var tMChangeoverTimePYMin = compChangeoverTimeMinutes * tMNoOfWheelsPY; //Changeover time per year in minutes (3M)
      var tMCostForChangePY = (tMChangeoverTimePYMin / 60) * compBurdenRatePerHour; //Cost for change per year (competitor)

      $scope.calculator.scoBri.materialSavingsAmount = compCostForWheelsPY - tMCostForWheelsPY;
      $scope.calculator.scoBri.materialSavingsPercent = Math.round(($scope.calculator.scoBri.materialSavingsAmount / compCostForWheelsPY) * 100);
      $scope.calculator.scoBri.laborSavingsAmount = compCostForLaborPY - tMCostForLaborPY;
      $scope.calculator.scoBri.laborSavingsPercent = Math.round(($scope.calculator.scoBri.laborSavingsAmount / compCostForLaborPY) * 100);
      $scope.calculator.scoBri.changeOverSavingsAmount = compCostForChangePY - tMCostForChangePY;
      $scope.calculator.scoBri.changeOverSavingsPercent = Math.round(($scope.calculator.scoBri.changeOverSavingsAmount / compCostForChangePY) * 100);
      $scope.calculator.scoBri.annualSavingsAmount = $scope.calculator.scoBri.materialSavingsAmount + $scope.calculator.scoBri.laborSavingsAmount + $scope.calculator.scoBri.changeOverSavingsAmount;
      $scope.calculator.scoBri.annualSavingsPercentage = ($scope.calculator.scoBri.annualSavingsAmount / (compCostForWheelsPY + compCostForLaborPY + compCostForChangePY)) * 100;
      $scope.calculator.scoBri.compCostForWheelsPY = compCostForWheelsPY;
      $scope.calculator.scoBri.tMCostForWheelsPY = tMCostForWheelsPY;
      $scope.calculator.scoBri.finishingCostPer = compCostForWheelsPY > tMCostForWheelsPY ? ((compCostForWheelsPY - tMCostForWheelsPY) / compCostForWheelsPY) * 100 : 0;
    }

    function createChartData() {

      $scope.chartData1 = {
        title: $scope.config.sbresultsPartsPerWheel,
        left: {
          label: $scope.calculator.scoBri.competitorProduct,
          value: $scope.calculator.scoBri.compPartsPerWheel
        },
        right: {
          label: $scope.calculator.scoBri.threeMProduct,
          value: $scope.calculator.scoBri.tMPartsPerWheel
        },
        circle: {
          label: $scope.config.sbresultsFasterCut,
          percent: parseFloat($scope.calculator.scoBri.tMPartsPerWheel / $scope.calculator.scoBri.compPartsPerWheel),
          css: 'faster-cut'
        }
      };

      $scope.chartData2 = {
        title: $scope.config.sbresultsTimeToProcess,
        left: {
          label: $scope.calculator.scoBri.competitorProduct,
          value: $scope.calculator.scoBri.compTimeProcessPart
        },
        right: {
          label: $scope.calculator.scoBri.threeMProduct,
          value: $scope.calculator.scoBri.tMTimeProcessPart
        },
        circle: {
          label: $scope.config.sbresultsMoreParts,
          percent: (($scope.calculator.scoBri.compTimeProcessPart - $scope.calculator.scoBri.tMTimeProcessPart) / $scope.calculator.scoBri.compTimeProcessPart) * 100,
          css: 'more-parts'
        }
      };

      $scope.chartData3 = {
        title: $scope.config.sbresultsAnnualCost,
        currency: $scope.config.currency,
        left: {
          label: $scope.calculator.scoBri.competitorProduct,
          value: $scope.calculator.scoBri.compCostForWheelsPY
        },
        right: {
          label: $scope.calculator.scoBri.threeMProduct,
          value: $scope.calculator.scoBri.tMCostForWheelsPY
        },
        circle: {
          label: $scope.config.sbresultsTotalCostSavings,
          percent: $scope.calculator.scoBri.finishingCostPer,
          css: ''
        }
      };

    }

    function createTableData() {
      $scope.tableData = {
        title: $scope.config.sbresultsAnnValueDelivered,
        rows: [{
          label: $scope.config.sbresultsAbrasiveSavings,
          value: $scope.calculator.scoBri.materialSavingsAmount,
          percent: $scope.calculator.scoBri.materialSavingsPercent * 100
        }, {
          label: $scope.config.coresultsChangeoverSavings,
          value: $scope.calculator.scoBri.changeOverSavingsAmount,
          percent: $scope.calculator.scoBri.changeOverSavingsPercent * 100
        }, {
          label: $scope.config.coresultsLaborSavings,
          value: $scope.calculator.scoBri.laborSavingsAmount,
          percent: $scope.calculator.scoBri.laborSavingsPercent * 100
        }, {
          label: $scope.config.resultsAnnualSavings,
          value: $scope.calculator.scoBri.annualSavingsAmount,
          percent: $scope.calculator.scoBri.annualSavingsAmountPercent
        }]
      };
    }

    function createPDFHtml() {}

    function init() {

      // Storage access
      $scope.customer = StorageService.getAccount('asd-customer');

      // Configurations
      $scope.config = ConfigService.getBeltTestConfigs();
      $scope.calc = {
        calculatorName: $scope.config.sbcalculatorName,
        resultsPerformTitle: $scope.config.sbresultsPerformTitle,
        resultsSavingsTitle: $scope.config.sbresultsSavingsTitle,
        resultsBackButtonText: $scope.config.sbresultsBackButtonText
      };

      // Calculations
      getCalculations();
      StorageService.saveAccount($scope.customer);

      // Chart data
      createChartData();
      createTableData();

      // $scope.calculator.scoBri.beltTestHtml = createPDFHtml();
      // CalculatorService.saveCalculator($scope.calculator);
    }

    init();

  }
];
