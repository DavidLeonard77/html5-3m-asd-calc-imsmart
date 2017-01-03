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
      $state.go('3m-asd-calc.depressed-center-savings');
    };

    function getCalculations() {

      $scope.calculator = CalculatorService.calculator();

      //Competitor values - Performance
      var compWheelStartWeight = parseFloat($scope.calculator.depCent.compWheelStartWeight);
      var compNumberOfParts = parseFloat($scope.calculator.depCent.compNumberOfParts);
      var compSecondsToGrind = parseFloat($scope.calculator.depCent.compSecondsToGrind);
      var compWheelEndWeight = parseFloat($scope.calculator.depCent.compWheelEndWeight);
      var compUsablePercentageofWheeltoEndofLife = parseFloat($scope.calculator.depCent.compUsablePercentageofWheeltoEndofLife);
      var compCurrentPartsProducedPerYear = parseFloat($scope.calculator.depCent.compCurrentPartsProducedPerYear);
      var compUnitCostforPart = parseFloat($scope.calculator.depCent.compUnitCostforPart);
      var compMarginonFinishedPart = parseFloat($scope.calculator.depCent.compMarginonFinishedPart);

      //3M values - Performance
      var tMWheelStartWeight = parseFloat($scope.calculator.depCent.tMWheelStartWeight);
      var tMNumberOfParts = parseFloat($scope.calculator.depCent.tMNumberOfParts);
      var tMSecondsToGrind = parseFloat($scope.calculator.depCent.tMSecondsToGrind);
      var tMWheelEndWeight = parseFloat($scope.calculator.depCent.tMWheelEndWeight);
      var tMUnitCostforPart = parseFloat($scope.calculator.depCent.compUnitCostforPart);
      var tMMarginonFinishedPart = parseFloat($scope.calculator.depCent.compMarginonFinishedPart);
      var tMCurrentPartsProducedPerYear = parseFloat($scope.calculator.depCent.compCurrentPartsProducedPerYear);
      var tMUsablePercentageofWheeltoEndofLife = parseFloat($scope.calculator.depCent.compUsablePercentageofWheeltoEndofLife);

      //Competitor values - Savings
      var compcostPerWheel = parseFloat($scope.calculator.depCent.compcostPerWheel);
      var compLabourCostPerHour = parseFloat($scope.calculator.depCent.compLabourCostPerHour);
      var compSecondsPerChangeover = parseFloat($scope.calculator.depCent.compSecondsPerChangeover);

      //3M values - Savings
      var tMcostPerWheel = parseFloat($scope.calculator.depCent.tMcostPerWheel);
      var tMLabourCostPerHour = parseFloat($scope.calculator.depCent.compLabourCostPerHour);
      var tMSecondsPerChangeover = parseFloat($scope.calculator.depCent.compSecondsPerChangeover);

      //Performance Calculations
      $scope.calculator.depCent.compPartsPerMinute = compNumberOfParts / (compSecondsToGrind / 60);
      $scope.calculator.depCent.compPartsPerHour = 60 * $scope.calculator.depCent.compPartsPerMinute;
      $scope.calculator.depCent.compWheelWeightLossperPart = (compWheelStartWeight - compWheelEndWeight) / compNumberOfParts;
      $scope.calculator.depCent.compTotalUsableGramsofWheel = (compWheelStartWeight * compUsablePercentageofWheeltoEndofLife) / 100;
      $scope.calculator.depCent.compPartsPerGram = compNumberOfParts / (compWheelStartWeight - compWheelEndWeight);
      $scope.calculator.depCent.compProjectedNumberOfParts = $scope.calculator.depCent.compPartsPerGram * $scope.calculator.depCent.compTotalUsableGramsofWheel;
      $scope.calculator.depCent.compNumerOfWheelsPerYear = compCurrentPartsProducedPerYear / $scope.calculator.depCent.compProjectedNumberOfParts;
      $scope.calculator.depCent.compEquivalentSalesVlueOfProduction = compUnitCostforPart / (1 - (compMarginonFinishedPart / 100));
      $scope.calculator.depCent.compThroughput = compCurrentPartsProducedPerYear * $scope.calculator.depCent.compEquivalentSalesVlueOfProduction;
      $scope.calculator.depCent.tMPartsPerMinute = tMNumberOfParts / (tMSecondsToGrind / 60);
      $scope.calculator.depCent.tMPartsPerHour = 60 * $scope.calculator.depCent.tMPartsPerMinute;
      $scope.calculator.depCent.tMCutSpeed = (($scope.calculator.depCent.tMPartsPerMinute / $scope.calculator.depCent.compPartsPerMinute) - 1) * 100;
      $scope.calculator.depCent.WheelWeightLossPerPart = (tMWheelStartWeight - tMWheelEndWeight) - tMNumberOfParts;
      $scope.calculator.depCent.tMWheelWear = 1 - $scope.calculator.depCent.WheelWeightLossPerPart / $scope.calculator.depCent.compWheelWeightLossperPart;
      $scope.calculator.depCent.tMTotalUsableGramsOfWheel = (tMWheelStartWeight * tMUsablePercentageofWheeltoEndofLife) / 100;
      $scope.calculator.depCent.tMPartsPerGram = tMNumberOfParts / (tMWheelStartWeight - tMWheelEndWeight);
      $scope.calculator.depCent.tMProjectedNumberOfParts = $scope.calculator.depCent.tMPartsPerGram * $scope.calculator.depCent.tMTotalUsableGramsOfWheel;
      $scope.calculator.depCent.tMPartsProduced = $scope.calculator.depCent.tMProjectedNumberOfParts / $scope.calculator.depCent.compProjectedNumberOfParts;
      $scope.calculator.depCent.tMNumberOfWheelsPerYear = tMCurrentPartsProducedPerYear / $scope.calculator.depCent.tMProjectedNumberOfParts;
      $scope.calculator.depCent.tMPartsProducedperYear = (compCurrentPartsProducedPerYear / $scope.calculator.depCent.compPartsPerHour) * $scope.calculator.depCent.tMPartsPerHour;
      $scope.calculator.depCent.tMEquivalentSalesValueOfProduction = tMUnitCostforPart / (1 - (tMMarginonFinishedPart / 100));
      $scope.calculator.depCent.tMThroughput = $scope.calculator.depCent.tMPartsProducedperYear * $scope.calculator.depCent.tMEquivalentSalesValueOfProduction;
      $scope.calculator.depCent.tMThroughputIncrease = $scope.calculator.depCent.tMThroughput - $scope.calculator.depCent.compThroughput;
      $scope.calculator.depCent.tMIncDec = ($scope.calculator.depCent.tMThroughputIncrease / $scope.calculator.depCent.compThroughput) * 100;
      $scope.calculator.depCent.compCostPerPart = compcostPerWheel / $scope.calculator.depCent.compProjectedNumberOfParts;
      $scope.calculator.depCent.compAbrasiveCostPerYear = $scope.calculator.depCent.compNumerOfWheelsPerYear * compcostPerWheel;
      $scope.calculator.depCent.compLaborPerPart = compLabourCostPerHour / $scope.calculator.depCent.compPartsPerHour;
      $scope.calculator.depCent.compLaborCostPerYear = $scope.calculator.depCent.compLaborPerPart * compCurrentPartsProducedPerYear;
      $scope.calculator.depCent.compNumberOfChangeoversPerYear = compCurrentPartsProducedPerYear / $scope.calculator.depCent.compProjectedNumberOfParts;
      $scope.calculator.depCent.compChangeoverCostPerWheel = (compLabourCostPerHour / 3600) * compSecondsPerChangeover;
      $scope.calculator.depCent.compChanegoverCostPerYear = $scope.calculator.depCent.compNumberOfChangeoversPerYear * $scope.calculator.depCent.compChangeoverCostPerWheel;
      $scope.calculator.depCent.compTotalAnnualGrindingCost = $scope.calculator.depCent.compAbrasiveCostPerYear +
        $scope.calculator.depCent.compLaborCostPerYear +
        $scope.calculator.depCent.compChanegoverCostPerYear;
      $scope.calculator.depCent.compGrindingCuttingCostPerPart = $scope.calculator.depCent.compTotalAnnualGrindingCost / compCurrentPartsProducedPerYear;
      $scope.calculator.depCent.tMCostPerPart = tMcostPerWheel / $scope.calculator.depCent.tMProjectedNumberOfParts;
      $scope.calculator.depCent.tMAbrasiveCostPerYear = $scope.calculator.depCent.tMNumberOfWheelsPerYear * tMcostPerWheel;
      $scope.calculator.depCent.tMAnnualAbrasiveSavings = $scope.calculator.depCent.compAbrasiveCostPerYear - $scope.calculator.depCent.tMAbrasiveCostPerYear;
      $scope.calculator.depCent.tMAbrasivesSavingsPercent = (1 - $scope.calculator.depCent.tMAbrasiveCostPerYear / $scope.calculator.depCent.compAbrasiveCostPerYear) * 100;
      $scope.calculator.depCent.tMLaborPerPart = tMLabourCostPerHour / $scope.calculator.depCent.tMPartsPerHour;
      $scope.calculator.depCent.tMLaborCostPerYear = $scope.calculator.depCent.tMLaborPerPart * tMCurrentPartsProducedPerYear;
      $scope.calculator.depCent.tMLaborSavings = ($scope.calculator.depCent.compLaborPerPart - $scope.calculator.depCent.tMLaborPerPart) * tMCurrentPartsProducedPerYear;
      $scope.calculator.depCent.tMLaborSavingsPercent = (($scope.calculator.depCent.compLaborPerPart - $scope.calculator.depCent.tMLaborPerPart) / $scope.calculator.depCent.compLaborPerPart) * 100;
      $scope.calculator.depCent.tMNumberOfChangeoversPerYear = tMCurrentPartsProducedPerYear / $scope.calculator.depCent.tMProjectedNumberOfParts;
      $scope.calculator.depCent.tMChangeoverCostPerWheel = (tMLabourCostPerHour / 3600) * tMSecondsPerChangeover;
      $scope.calculator.depCent.tMChanegoverCostPerYear = $scope.calculator.depCent.tMNumberOfChangeoversPerYear * $scope.calculator.depCent.tMChangeoverCostPerWheel;
      $scope.calculator.depCent.tMChangeoverSavings = $scope.calculator.depCent.compChanegoverCostPerYear - $scope.calculator.depCent.tMChanegoverCostPerYear;
      $scope.calculator.depCent.tMChangeoverSavingsPercent = ($scope.calculator.depCent.tMChangeoverSavings / $scope.calculator.depCent.compChanegoverCostPerYear) * 100;
      $scope.calculator.depCent.tMTotalAnnualGrindingCost = $scope.calculator.depCent.tMAbrasiveCostPerYear +
        $scope.calculator.depCent.tMLaborCostPerYear +
        $scope.calculator.depCent.tMChanegoverCostPerYear;
      $scope.calculator.depCent.tMGrindingCuttingCostPerPart = $scope.calculator.depCent.tMTotalAnnualGrindingCost / tMCurrentPartsProducedPerYear;
      $scope.calculator.depCent.tMAnnualSavings = $scope.calculator.depCent.compTotalAnnualGrindingCost - $scope.calculator.depCent.tMTotalAnnualGrindingCost;
      $scope.calculator.depCent.tMAnnualSavingsPercent = ($scope.calculator.depCent.tMAnnualSavings / $scope.calculator.depCent.compTotalAnnualGrindingCost) * 100;
      $scope.calculator.depCent.annualSavingsAmount = $scope.calculator.depCent.compTotalAnnualGrindingCost - $scope.calculator.depCent.tMTotalAnnualGrindingCost;
      $scope.calculator.depCent.annualSavingsAmountPercent = ($scope.calculator.depCent.annualSavingsAmount / $scope.calculator.depCent.compTotalAnnualGrindingCost) * 100;
      console.log($scope.calculator);
    }

    function createChartData() {

      $scope.chartData1 = {
        title: $scope.config.dcresultsPartsPerHour,
        left: {
          label: $scope.calculator.depCent.competitorProduct,
          value: $scope.calculator.depCent.compSecondsToGrind > 0 ? $scope.calculator.depCent.compSecondsToGrind : 0
        },
        right: {
          label: $scope.calculator.depCent.threeMProduct,
          value: $scope.calculator.depCent.tMSecondsToGrind > 0 ? $scope.calculator.depCent.tMSecondsToGrind : 0
        },
        circle: {
          label: $scope.config.dcresultsFasterCut,
          percent: $scope.calculator.depCent.tMCutSpeed > 0 ? $scope.calculator.depCent.tMCutSpeed : 0,
          css: 'faster-cut'
        }
      };

      $scope.chartData2 = {
        title: $scope.config.dcresultsPartsPerWheel,
        left: {
          label: $scope.calculator.depCent.competitorProduct,
          value: $scope.calculator.depCent.compProjectedNumberOfParts > 0 ? $scope.calculator.depCent.compProjectedNumberOfParts : 0
        },
        right: {
          label: $scope.calculator.depCent.threeMProduct,
          value: $scope.calculator.depCent.tMProjectedNumberOfParts > 0 ? $scope.calculator.depCent.tMProjectedNumberOfParts : 0
        },
        circle: {
          label: $scope.config.dcresultsMoreParts,
          percent: $scope.calculator.depCent.tMPartsProduced > 0 ? $scope.calculator.depCent.tMPartsProduced : 0,
          css: 'more-parts'
        }
      };

      $scope.chartData3 = {
        title: $scope.config.dcresultsAnnualCost,
        currency: $scope.config.currency,
        left: {
          label: $scope.calculator.depCent.competitorProduct,
          value: $scope.calculator.depCent.compTotalAnnualGrindingCost > 0 ? $scope.calculator.depCent.compTotalAnnualGrindingCost : 0
        },
        right: {
          label: $scope.calculator.depCent.threeMProduct,
          value: $scope.calculator.depCent.tMTotalAnnualGrindingCost > 0 ? $scope.calculator.depCent.tMTotalAnnualGrindingCost : 0
        },
        circle: {
          label: $scope.config.dcresultsTotalCostSavings,
          percent: parseFloat($scope.calculator.depCent.tMTotalAnnualGrindingCost / $scope.calculator.depCent.compTotalAnnualGrindingCost),
          css: ''
        }
      };

    }

    function createTableData() {
      $scope.tableData = {
        title: $scope.config.dcresultsAnnValueDelivered,
        rows: [{
          label: $scope.config.dcresultsAbrasiveSavings,
          value: $scope.calculator.depCent.tMAnnualAbrasiveSavings,
          percent: $scope.calculator.depCent.tMAbrasivesSavingsPercent * 100
        }, {
          label: $scope.config.dcresultsChangeoverSavings,
          value: $scope.calculator.depCent.tMChangeoverSavings,
          percent: $scope.calculator.depCent.tMChangeoverSavingsPercent * 100
        }, {
          label: $scope.config.dcresultsLaborSavings,
          value: $scope.calculator.depCent.tMLaborSavings,
          percent: $scope.calculator.depCent.tMLaborSavingsPercent * 100
        }, {
          label: $scope.config.dcresultsAnnualSavings,
          value: $scope.calculator.depCent.annualSavingsAmount,
          percent: $scope.calculator.depCent.annualSavingsAmountPercent
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

      // $scope.calculator.depCent.beltTestHtml = createPDFHtml();
      // CalculatorService.saveCalculator($scope.calculator);
    }

    init();

  }
];
