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

      var compNoOfCuts;
      var compSecondsToCut;
      var compCurrentCutsPerPart;
      var compCurrentPartsProducedPerYear;
      var compCurrentCutsPerYear;
      var compCostPerWheel;
      var compLaborBurdenCostPerHour;
      var compSecondsPerChangeover;
      var compCutsPerPart;
      var compMfgUnitCostPerPart;
      var compMarginOnFinishedPart;
      var tMNoOfCuts;
      var tMSecondsToCut;
      var tMCurrentCutsPerPart;
      var tMCurrentPartsProducedPerYear;
      var tMCurrentCutsPerYear;
      var tMCostPerWheel;
      var tMLaborBurdenCostPerHour;
      var tMSecondsPerChangeover;
      var tMCutsPerPart;
      var tMMfgUnitCostPerPart;
      var tMMarginOnFinishedPart;

      var compCutsPerMinute;
      var compCutsPerHour;
      var compCostPerCut;
      var compAbrasiveCostPerYear;
      var compLaborPerCut;
      var compLaborCostPerYear;
      var compNumberOfChangeoverPerYear;
      var compChangeoverCostPerWheel;
      var compChangeoverCostPerYear;
      var compTotalAnnualCuttingCost;
      var compGrindingCostPerCut;
      var compPartsProducedPerYear;
      var compCutsPerYear;
      var compEquivalentSalesValueOfProduction;
      var compThroughput;

      var tMCutsPerMinute;
      var tMCutsPerHour;
      var tMCutSpeed;
      var tMCutsPerWheel;
      var tMCostPerCut;
      var tMAbrasiveCostPerYear;
      var tMAnnualAbrasiveSavings;
      var tMAnnualAbrasiveSavingsPercentage;
      var tMLaborPerCut;
      var tMLaborCostPerYear;
      var tMLaborSavingsPerYear;
      var tMLaborSavingsPercentage;
      var tMNumberOfChangeoverPerYear;
      var tMChangeoverCostPerWheel;
      var tMChangeoverCostPerYear;
      var tMChangeoverSavings;
      var tMChangeoverSavingsPercentage;
      var tMTotalAnnualCuttingCost;
      var tMGrindingCostPerCut;
      var tMAnnualSavings;
      var tMAnnualSavingsPercentage;
      var tMPartsProducedPerYear;
      var tMCutsPerYear;
      var tMEquivalentSalesValueOfProduction;
      var tMThroughput;
      var tMThroughputDifference;
      var tMThroughputDifferencePercentage;

      compNoOfCuts = parseFloat($scope.calculator.cutOff.compNoOfCuts);
      compSecondsToCut = parseFloat($scope.calculator.cutOff.compSecondsToCut);
      compCurrentCutsPerPart = parseFloat($scope.calculator.cutOff.compNoOfCuts);
      compCurrentPartsProducedPerYear = parseFloat($scope.calculator.cutOff.compCurrentPartsProducedPerYear);
      compCurrentCutsPerYear = compCurrentCutsPerPart * compCurrentPartsProducedPerYear;

      compCostPerWheel = parseFloat($scope.calculator.cutOff.compCostPerWheel);
      compLaborBurdenCostPerHour = parseFloat($scope.calculator.cutOff.compLaborBurdenCostPerHour);
      compSecondsPerChangeover = parseFloat($scope.calculator.cutOff.compSecondsPerChangeover);
      compCutsPerPart = parseFloat($scope.calculator.cutOff.compCutsPerPart);
      compMfgUnitCostPerPart = parseFloat($scope.calculator.cutOff.compMfgUnitCostPerPart);
      compMarginOnFinishedPart = parseFloat($scope.calculator.cutOff.compMarginOnFinishedPart);

      tMNoOfCuts = parseFloat($scope.calculator.cutOff.tMNoOfCuts);
      tMSecondsToCut = parseFloat($scope.calculator.cutOff.tMSecondsToCut);
      tMCurrentCutsPerPart = parseFloat($scope.calculator.cutOff.compNoOfCuts);
      tMCurrentPartsProducedPerYear = parseFloat($scope.calculator.cutOff.compCurrentPartsProducedPerYear);
      tMCurrentCutsPerYear = compCurrentCutsPerYear;

      tMCostPerWheel = parseFloat($scope.calculator.cutOff.tMCostPerWheel);
      tMLaborBurdenCostPerHour = parseFloat($scope.calculator.cutOff.compLaborBurdenCostPerHour);
      tMSecondsPerChangeover = parseFloat($scope.calculator.cutOff.compSecondsPerChangeover);
      tMCutsPerPart = parseFloat($scope.calculator.cutOff.compCutsPerPart);
      tMMfgUnitCostPerPart = parseFloat($scope.calculator.cutOff.tMMfgUnitCostPerPart);
      tMMarginOnFinishedPart = parseFloat($scope.calculator.cutOff.tMMarginOnFinishedPart);

      $scope.calculator.cutOff.compCutsPerMinute = compCutsPerMinute = compNoOfCuts / (compSecondsToCut / 60);
      $scope.calculator.cutOff.tMCutsPerMinute = tMCutsPerMinute = tMNoOfCuts / (tMSecondsToCut / 60);
      $scope.calculator.cutOff.compCutsPerHour = compCutsPerHour = compCutsPerMinute * 60;
      $scope.calculator.cutOff.tMCutsPerHour = tMCutsPerHour = tMCutsPerMinute * 60;
      $scope.calculator.cutOff.tMCutSpeed = tMCutSpeed = (tMCutsPerMinute / compCutsPerMinute) - 1;
      $scope.calculator.cutOff.tMCutsPerWheel = tMCutsPerWheel = tMNoOfCuts / compNoOfCuts;
      $scope.calculator.cutOff.compCostPerCut = compCostPerCut = compCostPerWheel / compNoOfCuts;
      $scope.calculator.cutOff.tMCostPerCut = tMCostPerCut = tMCostPerWheel / tMNoOfCuts;
      $scope.calculator.cutOff.compAbrasiveCostPerYear = compAbrasiveCostPerYear = compCostPerCut * compCurrentCutsPerYear;
      $scope.calculator.cutOff.tMAbrasiveCostPerYear = tMAbrasiveCostPerYear = tMCostPerCut * tMCurrentCutsPerYear;
      $scope.calculator.cutOff.tMAnnualAbrasiveSavings = tMAnnualAbrasiveSavings = compAbrasiveCostPerYear - tMAbrasiveCostPerYear;
      $scope.calculator.cutOff.tMAnnualAbrasiveSavingsPercentage = tMAnnualAbrasiveSavingsPercentage = 1 - (tMAbrasiveCostPerYear / compAbrasiveCostPerYear);
      $scope.calculator.cutOff.compLaborPerCut = compLaborPerCut = compLaborBurdenCostPerHour / compCutsPerHour;
      $scope.calculator.cutOff.tMLaborPerCut = tMLaborPerCut = tMLaborBurdenCostPerHour / tMCutsPerHour;
      $scope.calculator.cutOff.compLaborCostPerYear = compLaborCostPerYear = compLaborPerCut * compCurrentCutsPerYear;
      $scope.calculator.cutOff.tMLaborCostPerYear = tMLaborCostPerYear = tMLaborPerCut * tMCurrentCutsPerYear;
      $scope.calculator.cutOff.tMLaborSavingsPerYear = tMLaborSavingsPerYear = compLaborCostPerYear - tMLaborCostPerYear;
      $scope.calculator.cutOff.tMLaborSavingsPercentage = tMLaborSavingsPercentage = 1 - (tMLaborCostPerYear / compLaborCostPerYear);
      $scope.calculator.cutOff.compNumberOfChangeoverPerYear = compNumberOfChangeoverPerYear = compCurrentCutsPerYear / compNoOfCuts;
      $scope.calculator.cutOff.tMNumberOfChangeoverPerYear = tMNumberOfChangeoverPerYear = tMCurrentCutsPerYear / tMNoOfCuts;
      $scope.calculator.cutOff.compChangeoverCostPerWheel = compChangeoverCostPerWheel = (compLaborBurdenCostPerHour / 3600) * compSecondsPerChangeover;
      $scope.calculator.cutOff.tMChangeoverCostPerWheel = tMChangeoverCostPerWheel = (tMLaborBurdenCostPerHour / 3600) * tMSecondsPerChangeover;
      $scope.calculator.cutOff.compChangeoverCostPerYear = compChangeoverCostPerYear = compNumberOfChangeoverPerYear * compChangeoverCostPerWheel;
      $scope.calculator.cutOff.tMChangeoverCostPerYear = tMChangeoverCostPerYear = tMNumberOfChangeoverPerYear * tMChangeoverCostPerWheel;
      $scope.calculator.cutOff.tMChangeoverSavings = tMChangeoverSavings = compChangeoverCostPerYear - tMChangeoverCostPerYear;
      $scope.calculator.cutOff.tMChangeoverSavingsPercentage = tMChangeoverSavingsPercentage = 1 - (tMChangeoverCostPerYear / compChangeoverCostPerYear);
      $scope.calculator.cutOff.compTotalAnnualCuttingCost = compTotalAnnualCuttingCost = compAbrasiveCostPerYear + compLaborCostPerYear + compChangeoverCostPerYear;
      $scope.calculator.cutOff.tMTotalAnnualCuttingCost = tMTotalAnnualCuttingCost = tMAbrasiveCostPerYear + tMLaborCostPerYear + tMChangeoverCostPerYear;
      $scope.calculator.cutOff.compGrindingCostPerCut = compGrindingCostPerCut = compTotalAnnualCuttingCost / compCurrentCutsPerYear;
      $scope.calculator.cutOff.tMGrindingCostPerCut = tMGrindingCostPerCut = tMTotalAnnualCuttingCost / tMCurrentCutsPerYear;
      $scope.calculator.cutOff.tMAnnualSavings = tMAnnualSavings = compTotalAnnualCuttingCost - tMTotalAnnualCuttingCost;
      $scope.calculator.cutOff.tMAnnualSavingsPercentage = tMAnnualSavingsPercentage = tMAnnualSavings / compTotalAnnualCuttingCost;
      $scope.calculator.cutOff.compPartsProducedPerYear = compPartsProducedPerYear = 10000;
      $scope.calculator.cutOff.tMPartsProducedPerYear = tMPartsProducedPerYear = (compCurrentPartsProducedPerYear / compCutsPerHour) * tMCutsPerHour;
      $scope.calculator.cutOff.compCutsPerYear = compCutsPerYear = compCurrentPartsProducedPerYear * compCutsPerPart;
      $scope.calculator.cutOff.tMCutsPerYear = tMCutsPerYear = tMCurrentPartsProducedPerYear * tMCutsPerPart;
      $scope.calculator.cutOff.compEquivalentSalesValueOfProduction = compEquivalentSalesValueOfProduction = compMfgUnitCostPerPart / (1 - compMarginOnFinishedPart);
      $scope.calculator.cutOff.tMEquivalentSalesValueOfProduction = tMEquivalentSalesValueOfProduction = tMMfgUnitCostPerPart / (1 - tMMarginOnFinishedPart);
      $scope.calculator.cutOff.compThroughput = compThroughput = compCutsPerYear * compEquivalentSalesValueOfProduction;
      $scope.calculator.cutOff.tMThroughput = tMThroughput = tMCutsPerYear * tMEquivalentSalesValueOfProduction;
      $scope.calculator.cutOff.tMThroughputDifference = tMThroughputDifference = tMThroughput - compThroughput;
      $scope.calculator.cutOff.tMThroughputDifferencePercentage = tMThroughputDifferencePercentage = tMThroughput / compThroughput;
      $scope.calculator.cutOff.savings = ((compTotalAnnualCuttingCost - tMTotalAnnualCuttingCost) / compTotalAnnualCuttingCost) * 100;
      $scope.calculator.cutOff.annualSavingsAmount = $scope.calculator.cutOff.compTotalAnnualCuttingCost - $scope.calculator.cutOff.tMTotalAnnualCuttingCost;
      $scope.calculator.cutOff.annualSavingsAmountPercent = ($scope.calculator.cutOff.annualSavingsAmount / $scope.calculator.cutOff.compTotalAnnualCuttingCost) * 100;
    }

    function createChartData() {

      $scope.chartData1 = {
        title: $scope.config.coresultsPartsPerHour,
        left: {
          label: $scope.calculator.cutOff.competitorProduct,
          value: Math.round($scope.calculator.cutOff.compCutsPerHour * 10) / 10
        },
        right: {
          label: $scope.calculator.cutOff.threeMProduct,
          value: Math.round($scope.calculator.cutOff.tMCutsPerHour * 10) / 10
        },
        circle: {
          label: $scope.config.coresultsFasterCut,
          percent: Math.round($scope.calculator.cutOff.tMCutSpeed * 100),
          css: 'faster-cut'
        }
      };

      $scope.chartData2 = {
        title: $scope.config.coresultsCutsPerWheel,
        left: {
          label: $scope.calculator.cutOff.competitorProduct,
          value: parseFloat($scope.calculator.cutOff.compNoOfCuts)
        },
        right: {
          label: $scope.calculator.cutOff.threeMProduct,
          value: parseFloat($scope.calculator.cutOff.tMNoOfCuts)
        },
        circle: {
          label: $scope.config.coresultsMoreParts,
          percent: Math.round($scope.calculator.cutOff.tMCutsPerWheel * 100) / 100,
          css: 'more-parts'
        }
      };

      $scope.chartData3 = {
        title: $scope.config.coresultsAnnualCost,
        currency: $scope.config.currency,
        left: {
          label: $scope.calculator.cutOff.competitorProduct,
          value: $scope.calculator.cutOff.compTotalAnnualCuttingCost
        },
        right: {
          label: $scope.calculator.cutOff.threeMProduct,
          value: $scope.calculator.cutOff.tMTotalAnnualCuttingCost
        },
        circle: {
          label: $scope.config.coresultsTotalCostSavings,
          percent: $scope.calculator.cutOff.savings,
          css: ''
        }
      };

    }

    function createTableData() {
      $scope.tableData = {
        title: $scope.config.coresultsAnnValueDelivered,
        rows: [{
          label: $scope.config.coresultsAbrasiveSavings,
          value: $scope.calculator.cutOff.tMAnnualAbrasiveSavings,
          percent: $scope.calculator.cutOff.tMAnnualAbrasiveSavingsPercentage * 100
        }, {
          label: $scope.config.coresultsChangeoverSavings,
          value: $scope.calculator.cutOff.tMChangeoverSavings,
          percent: $scope.calculator.cutOff.tMChangeoverSavingsPercentage * 100
        }, {
          label: $scope.config.coresultsLaborSavings,
          value: $scope.calculator.cutOff.tMLaborSavingsPerYear,
          percent: $scope.calculator.cutOff.tMLaborSavingsPercentage * 100
        }, {
          label: $scope.config.coresultsAnnualSavings,
          value: $scope.calculator.cutOff.annualSavingsAmount,
          percent: $scope.calculator.cutOff.annualSavingsAmountPercent
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
        calculatorName: $scope.config.cocalculatorName,
        resultsPerformTitle: $scope.config.coresultsPerformTitle,
        resultsSavingsTitle: $scope.config.coresultsSavingsTitle,
        resultsBackButtonText: $scope.config.coresultsBackButtonText
      };

      // Calculations
      getCalculations();
      StorageService.saveAccount($scope.customer);

      // Chart data
      createChartData();
      createTableData();

      // $scope.calculator.beltTestHtml = createPDFHtml();
      // CalculatorService.saveCalculator($scope.calculator);
    }

    init();

  }
];
