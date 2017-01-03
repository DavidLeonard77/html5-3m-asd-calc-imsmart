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

      // Competitor
      var compAnnualNoOfMaterials;
      var compLaborChargePerPart;
      var compPartsPerYear;
      var compChangeoverAnnualTimeSeconds;
      var compChangeoverAnnualTimeHours;
      var compPartsPerDisk;
      var compTimeToProcessPart;
      var compAnnualSpendPerYear;
      var compChangeoverSavings;
      var compLaborSavings;

      // 3M
      var threeMAnnualNoOfMaterials;
      var threeMLaborChargePerPart;
      var threeMPartsPerYear;
      var threeMChangeoverAnnualTimeSeconds;
      var threeMChangeoverAnnualTimeHours;
      var threeMPartsPerDisk;
      var threeMTimeToProcessPart;
      var threeMCostPerDisk;
      var threeMChangeoverSavings;
      var threeMLaborSavings;

      $scope.materialsSavings = 0;
      $scope.laborSavings = 0;
      $scope.changeoverSavings = 0;
      $scope.totalAnnualsavings = 0;
      $scope.laborSavingsPercentage = 0;
      $scope.abrasiveSavingsPercentage = 0;
      $scope.changeoverSavingsPercentage = 0;

      // Competitor Materials
      compAnnualNoOfMaterials = parseFloat($scope.calculator.diskTest.compAnnualSpendPerYear / $scope.calculator.diskTest.compCostPerDisk);
      threeMAnnualNoOfMaterials = parseFloat(compAnnualNoOfMaterials * ($scope.calculator.diskTest.competitorPartsPerDisk / $scope.calculator.diskTest.threeMPartsPerDisk));
      compLaborChargePerPart = parseFloat($scope.calculator.diskTest.compBurdenRatePerHour * ($scope.calculator.diskTest.competitorTimeToProcessPart / 3600));
      compPartsPerYear = parseFloat(compAnnualNoOfMaterials * $scope.calculator.diskTest.competitorPartsPerDisk);
      threeMLaborChargePerPart = parseFloat($scope.calculator.diskTest.compBurdenRatePerHour * ($scope.calculator.diskTest.threeMTimeToProcessPart / 3600));
      threeMPartsPerYear = parseFloat(threeMAnnualNoOfMaterials * $scope.calculator.diskTest.threeMPartsPerDisk);
      compChangeoverAnnualTimeSeconds = parseFloat(compAnnualNoOfMaterials * $scope.calculator.diskTest.compSecondsPerChangeover);
      compChangeoverAnnualTimeHours = parseFloat(compChangeoverAnnualTimeSeconds / 3600);
      threeMChangeoverAnnualTimeSeconds = parseFloat(threeMAnnualNoOfMaterials * $scope.calculator.diskTest.compSecondsPerChangeover);
      threeMChangeoverAnnualTimeHours = parseFloat(threeMChangeoverAnnualTimeSeconds / 3600);

      // chart 1
      compPartsPerDisk = parseFloat($scope.calculator.diskTest.competitorPartsPerDisk);
      threeMPartsPerDisk = parseFloat($scope.calculator.diskTest.threeMPartsPerDisk);
      $scope.calculator.diskTest.morePartsPercentage = Math.round(((threeMPartsPerDisk - compPartsPerDisk) / threeMPartsPerDisk) * 100);

      // chart 2
      compTimeToProcessPart = parseFloat($scope.calculator.diskTest.competitorTimeToProcessPart);
      threeMTimeToProcessPart = parseFloat($scope.calculator.diskTest.threeMTimeToProcessPart);
      $scope.calculator.diskTest.fasterCutPercentage = Math.round(((compTimeToProcessPart - threeMTimeToProcessPart) / compTimeToProcessPart) * 100);

      // cart 3
      compAnnualSpendPerYear = parseFloat($scope.calculator.diskTest.compAnnualSpendPerYear);
      threeMCostPerDisk = parseFloat(threeMAnnualNoOfMaterials * $scope.calculator.diskTest.threeMCostPerDisk);
      $scope.calculator.diskTest.threeMAnnualNoOfMaterials = threeMCostPerDisk;
      $scope.calculator.diskTest.abrasiveSavingsPercentage = Math.round(((compAnnualSpendPerYear - threeMCostPerDisk) / compAnnualSpendPerYear) * 100);

      // table
      $scope.calculator.diskTest.materialsSavings = parseFloat(compAnnualSpendPerYear - threeMCostPerDisk);

      //labor
      compLaborSavings = parseFloat(compLaborChargePerPart * compPartsPerYear);
      threeMLaborSavings = parseFloat(threeMLaborChargePerPart * threeMPartsPerYear);
      $scope.calculator.diskTest.laborSavings = compLaborSavings - threeMLaborSavings;
      $scope.calculator.diskTest.laborSavingsPercentage = Math.round(((compLaborSavings - threeMPartsPerDisk) / compLaborSavings) * 100);

      //changeover
      compChangeoverSavings = parseFloat(compChangeoverAnnualTimeHours * $scope.calculator.diskTest.compBurdenRatePerHour);
      threeMChangeoverSavings = parseFloat(threeMChangeoverAnnualTimeHours * $scope.calculator.diskTest.compBurdenRatePerHour);
      $scope.calculator.diskTest.changeoverSavings = compChangeoverSavings - threeMChangeoverSavings;
      $scope.calculator.diskTest.changeoverSavingsPercentage = Math.round(((compChangeoverSavings - threeMChangeoverSavings) / compChangeoverSavings) * 100);

      //total
      $scope.calculator.diskTest.totalAnnualSavings = $scope.calculator.diskTest.materialsSavings + $scope.calculator.diskTest.laborSavings + $scope.calculator.diskTest.changeoverSavings;
      $scope.calculator.diskTest.totalAnnualSavingsPercentage = ($scope.calculator.diskTest.totalAnnualSavings / ($scope.c1left + compLaborSavings + threeMLaborSavings)) * 100;

    }

    function createChartData() {

      $scope.chartData1 = {
        title: $scope.config.dtresultsAnnualCost,
        currency: $scope.config.currency,
        left: {
          label: $scope.calculator.diskTest.competitorProduct,
          value: parseFloat($scope.calculator.diskTest.competitorPartsPerDisk)
        },
        right: {
          label: $scope.calculator.diskTest.threeMProduct,
          value: parseFloat($scope.calculator.diskTest.threeMPartsPerDisk)
        },
        circle: {
          label: $scope.config.dtresultsMoreParts,
          percent: $scope.calculator.diskTest.morePartsPercentage,
          css: 'more-parts'
        }
      };

      $scope.chartData2 = {
        title: $scope.config.coresultsCutsPerWheel,
        left: {
          label: $scope.calculator.diskTest.competitorProduct,
          value: parseFloat($scope.calculator.diskTest.competitorTimeToProcessPart)
        },
        right: {
          label: $scope.calculator.diskTest.threeMProduct,
          value: parseFloat($scope.calculator.diskTest.threeMTimeToProcessPart)
        },
        circle: {
          label: $scope.config.dtresultsFasterCut,
          percent: $scope.calculator.diskTest.fasterCutPercentage,
          css: 'faster-cut'
        }
      };

      $scope.chartData3 = {
        title: $scope.config.dtresultsAnnualCost,
        left: {
          label: $scope.calculator.diskTest.competitorProduct,
          value: parseFloat($scope.calculator.diskTest.compAnnualSpendPerYear)
        },
        right: {
          label: $scope.calculator.diskTest.dtthreeMProduct,
          value: parseFloat($scope.calculator.diskTest.threeMAnnualNoOfMaterials * $scope.calculator.diskTest.threeMCostPerDisk)
        },
        circle: {
          label: $scope.config.dtresultsAbrasiveSavings,
          percent: $scope.calculator.diskTest.abrasiveSavingsPercentage,
          css: ''
        }
      };

    }

    function createTableData() {
      $scope.tableData = {
        title: $scope.config.dtresultsAnnValueDelivered,
        rows: [{
          label: $scope.config.dtresultsAbrasiveSavings,
          value: $scope.calculator.diskTest.materialsSavings,
          percent: $scope.calculator.diskTest.abrasiveSavingsPercentage
        }, {
          label: $scope.config.dtresultsLaborSavings,
          value: $scope.calculator.diskTest.laborSavings,
          percent: $scope.calculator.diskTest.laborSavingsPercentage
        }, {
          label: $scope.config.dtresultsChangeoverSavings,
          value: $scope.calculator.diskTest.changeoverSavings,
          percent: $scope.calculator.diskTest.changeoverSavingsPercentage
        }, {
          label: $scope.config.dtresultsAnnualSavings,
          value: $scope.calculator.diskTest.totalAnnualSavings,
          percent: $scope.calculator.diskTest.totalAnnualSavingsPercentage
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
        calculatorName: $scope.config.dtcalculatorName,
        resultsPerformTitle: $scope.config.dtresultsPerformTitle,
        resultsSavingsTitle: $scope.config.dtresultsSavingsTitle,
        resultsBackButtonText: $scope.config.dtresultsBackButtonText
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
