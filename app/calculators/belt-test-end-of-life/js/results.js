'use strict';

module.exports = [
  '$state',
  '$scope',
  '$rootScope',
  '$timeout',
  'CalculatorService',
  'StorageService',
  'ConfigService',
  'PDFService',

  function(
    $state,
    $scope,
    $rootScope,
    $timeout,
    CalculatorService,
    StorageService,
    ConfigService,
    PDFService
  ) {

    $scope.navigation = {};
    $scope.navigation.goBack = function() {
      CalculatorService.saveCalculator($scope.calculator);
      $state.go('3m-asd-calc.belt-test-end-of-life-savings');
    };

    function getCalculations() {

      $scope.calculator = CalculatorService.calculator();

      //Parts
      var compAnualSpend = parseFloat($scope.calculator.beltTest.competitorAnnualSpend);
      var compCostPerBelt = parseFloat($scope.calculator.beltTest.competitorCostPerBelt);
      var compPartsPerBelt = parseFloat($scope.calculator.beltTest.competitorPartsPerBelt);
      var tmPartsPerBelt = parseFloat($scope.calculator.beltTest.threeMPartsPerBelt);
      var tmCostPerBelt = parseFloat($scope.calculator.beltTest.threeMCostPerBelt);
      var compBurdenRate = parseFloat($scope.calculator.beltTest.competitorBurdenRatePerHour);
      var compPartsPerHour = parseFloat($scope.calculator.beltTest.competitorPartsPerHour);
      var tmPartsPerHour = parseFloat($scope.calculator.beltTest.threeMPartsPerHour);
      var compChangeOverTime = parseFloat($scope.calculator.beltTest.competitorChangeOverTime) * 60;

      //comp changeover time
      var compNumberOfWheelsPerYear = compAnualSpend / compCostPerBelt;
      var compChangeTimePerYearSec = compNumberOfWheelsPerYear * compChangeOverTime;
      var compChangeTimePerYearHr = compChangeTimePerYearSec / 3600;
      var compChangeOver = compChangeTimePerYearHr * compBurdenRate;

      //Abrasive savings
      $scope.calculator.beltTest.abrasiveSavingsAmount = compAnualSpend - ((compAnualSpend / compCostPerBelt) * (compPartsPerBelt / tmPartsPerBelt) * tmCostPerBelt);
      $scope.calculator.beltTest.abrasiveSavingsPercent = ($scope.calculator.beltTest.abrasiveSavingsAmount / compAnualSpend) * 100;

      //Labor
      var compLaborPerPart = compBurdenRate * (compPartsPerHour / 3600);
      var compPartsPerYear = compNumberOfWheelsPerYear * compPartsPerBelt;
      var compLabor = compLaborPerPart * compPartsPerYear;
      var tmLaborPerPart = compBurdenRate * (tmPartsPerHour / 3600);
      var tmNumberOfWheelsPerYear = compNumberOfWheelsPerYear * (compPartsPerBelt / tmPartsPerBelt);
      var tmPartsPerYear = tmNumberOfWheelsPerYear * tmPartsPerBelt;
      var tmLabor = tmLaborPerPart * tmPartsPerYear;

      //Labor savings
      $scope.calculator.beltTest.laborSavingsAmount = compLabor - tmLabor;
      $scope.calculator.beltTest.laborSavingsPercent = ((compLabor - tmLabor) / compLabor) * 100;

      //tm changeover time
      var tmChangeTimePerYearSec = tmNumberOfWheelsPerYear * compChangeOverTime;
      var tmChangeTimePerYearHr = tmChangeTimePerYearSec / 3600;
      var tmChangeOver = tmChangeTimePerYearHr * compBurdenRate;

      //Changeover savings
      $scope.calculator.beltTest.changeOverSavingsAmount = compChangeOver - tmChangeOver;
      $scope.calculator.beltTest.changeOverSavingsPercent = (1 - (compPartsPerBelt / tmPartsPerBelt)) * 100;
      $scope.calculator.beltTest.annualSavingsAmount = $scope.calculator.beltTest.abrasiveSavingsAmount + $scope.calculator.beltTest.laborSavingsAmount + $scope.calculator.beltTest.changeOverSavingsAmount;

      //compCostOfWheelsPerYear
      var compCostOfWheelsPerYear = compNumberOfWheelsPerYear * compCostPerBelt;
      var compLaborPerYear = compLaborPerPart * compPartsPerYear;
      var compChangePerYear = compChangeTimePerYearHr * compBurdenRate;

      //Competitor's total annual cost
      $scope.calculator.beltTest.compTotalCost = compCostOfWheelsPerYear + compLaborPerYear + compChangePerYear;
      $scope.calculator.beltTest.tmTotalCost = $scope.calculator.beltTest.compTotalCost - $scope.calculator.beltTest.annualSavingsAmount;
      $scope.calculator.beltTest.annualSavingsPercent = ($scope.calculator.beltTest.annualSavingsAmount / (compCostOfWheelsPerYear + compLaborPerYear + compChangePerYear)) * 100;
      $scope.calculator.beltTest.partsPerHourPercent = (($scope.calculator.beltTest.competitorPartsPerHour - $scope.calculator.beltTest.threeMPartsPerHour) / $scope.calculator.beltTest.competitorPartsPerHour) * 100;
      $scope.calculator.beltTest.partsPerBeltPercent = ((tmPartsPerBelt / compPartsPerBelt) * 10) / 10;
    }

    function createChartData() {

      $scope.chartData1 = {
        title: $scope.config.resultsTimeToProcess,
        left: {
          label: $scope.calculator.beltTest.competitorProduct,
          value: $scope.calculator.beltTest.competitorPartsPerHour
        },
        right: {
          label: $scope.calculator.beltTest.threeMProduct,
          value: $scope.calculator.beltTest.threeMPartsPerHour
        },
        circle: {
          label: $scope.config.resultsFasterCut,
          percent: $scope.calculator.beltTest.partsPerHourPercent,
          css: 'faster-cut'
        }
      };

      $scope.chartData2 = {
        title: $scope.config.resultsPartsPerBelt,
        left: {
          label: $scope.calculator.beltTest.competitorProduct,
          value: parseFloat($scope.calculator.beltTest.threeMPartsPerBelt)
        },
        right: {
          label: $scope.calculator.beltTest.threeMProduct,
          value: parseFloat($scope.calculator.beltTest.threeMPartsPerBelt)
        },
        circle: {
          label: $scope.config.resultsMoreParts,
          percent: $scope.calculator.beltTest.partsPerBeltPercent,
          css: 'more-parts'
        }
      };

      $scope.chartData3 = {
        title: $scope.config.resultsAnnualCost,
        currency: $scope.config.currency,
        left: {
          label: $scope.calculator.beltTest.competitorProduct,
          value: $scope.calculator.beltTest.compTotalCost
        },
        right: {
          label: $scope.calculator.beltTest.threeMProduct,
          value: $scope.calculator.beltTest.tmTotalCost
        },
        circle: {
          label: $scope.config.resultsTotalCostSavings,
          percent: $scope.calculator.beltTest.annualSavingsPercent,
          css: ''
        }
      };

    }

    function createTableData() {
      $scope.tableData = {
        title: $scope.config.resultsAnnValueDelivered,
        rows: [{
          label: $scope.config.resultsAbrasiveSavings,
          value: $scope.calculator.beltTest.abrasiveSavingsAmount,
          percent: $scope.calculator.beltTest.abrasiveSavingsPercent
        }, {
          label: $scope.config.resultsChangeoverSavings,
          value: $scope.calculator.beltTest.changeOverSavingsAmount,
          percent: $scope.calculator.beltTest.changeOverSavingsPercent
        }, {
          label: $scope.config.resultsLaborSavings,
          value: $scope.calculator.beltTest.laborSavingsAmount,
          percent: $scope.calculator.beltTest.laborSavingsPercent
        }, {
          label: $scope.config.resultsAnnualSavings,
          value: $scope.calculator.beltTest.annualSavingsAmount,
          percent: $scope.calculator.beltTest.annualSavingsPercent
        }]
      };
    }

    // NOTE move this to template and pass scope
    function createPDFHtml(callback) {

      // var higherValueCosts = 0;
      //
      // var decimal;
      // if (higherValueCosts>1000) {
      //   decimal = higherValueCosts >= 10000 ? null : 1;
      //   higherValueCosts = higherValueCosts/1000;
      //   $scope.halfHigherValueCosts = higherValueCosts/2;
      //
      //   higherValueCosts = higherValueCosts.format(decimal) + 'k';
      //   $scope.halfHigherValueCosts = $scope.halfHigherValueCosts.format(decimal) + 'k';
      // } else {
      //   decimal = higherValueCosts >= 10 ? null : 1;
      //   higherValueCosts = higherValueCosts.format(decimal);
      //   $scope.halfHigherValueCosts = (higherValueCosts/2).format(decimal);
      // }
      //
      // console.log('This is user name ' + StorageService.getAccount('asd-settings').userName);

      // var costsGraph = '<div class="graph-wrapper">\
      //   <div class = "graph-container floatfix">\
      //     <div class="bar-wrapper">\
      //       <div class="bar-container">\
      //         <div class="spacer-container" style="height:' + (100 - 32) + '%;"></div>\
      //         <div class="value-container" style="height:' + 23 + '%; line-height:' + 332 + 'px;">' + $scope.config.currency + $scope.calculator.beltTest.compTotalCost.format(2) + '\
      //         </div>\
      //         <div class="axis-name">'+$scope.calculator.beltTest.competitorProduct+'</div>\
      //       </div>\
      //       <div class="bar-container">\
      //         <div class="spacer-container" style="height:' + (100 - 3222) + '%;"></div>\
      //         <div class="value-container" style="height:' + 233 + '%; line-height:' + 2*2 + 'px;">' + $scope.config.currency + $scope.calculator.beltTest.tmTotalCost.format(2) + '\
      //         </div>\
      //         <div class="axis-name">'+$scope.calculator.beltTest.threeMProduct+'</div>\
      //       </div>\
      //     </div>\
      //     </div>\
      //     <div class="grid-wrapper">\
      //       <div class="top-value">' + $scope.config.currency + 33 + '</div>\
      //       <div class="middle-value">' + $scope.config.currency + 33 + '</div>\
      //       <div class="bottom-value">' + $scope.config.currency + '0</div>\
      //     </div>\
      //   </div>';
      //
      // var fasterGraph = '<div class="graph-wrapper">\
      //   <div class = "graph-container floatfix">\
      //     <div class="bar-wrapper">\
      //       <div class="bar-container">\
      //         <div class="spacer-container" style="height:' + (100 - 0) + '%;"></div>\
      //         <div class="value-container" style="height:' + 0 + '%; line-height:' + 0*2 + 'px;">' + 0 + '\
      //         </div>\
      //         <div class="axis-name">'+$scope.calculator.beltTest.competitorProduct+'</div>\
      //       </div>\
      //       <div class="bar-container">\
      //         <div class="spacer-container" style="height:' + (100 - 23) + '%;"></div>\
      //         <div class="value-container" style="height:' + 100 + '%; line-height:' + 0 + 'px;">' + 32 + '\
      //         </div>\
      //         <div class="axis-name">'+$scope.calculator.beltTest.threeMProduct+'</div>\
      //       </div>\
      //     </div>\
      //     </div>\
      //     <div class="grid-wrapper">\
      //       <div class="top-value">' + 12 + '</div>\
      //       <div class="middle-value">' + 32 + '</div>\
      //       <div class="bottom-value">0.0</div>\
      //     </div>\
      //   </div>';
      //
      // var moreCutsGraph = '<div class="graph-wrapper">\
      //   <div class = "graph-container floatfix">\
      //     <div class="bar-wrapper">\
      //       <div class="bar-container">\
      //         <div class="spacer-container" style="height:' + (100 - 23) + '%;"></div>\
      //         <div class="value-container" style="height:' + 32 + '%; line-height:' + 4*2 + 'px;">' + 23 + '\
      //         </div>\
      //         <div class="axis-name">'+$scope.calculator.beltTest.competitorProduct+'</div>\
      //       </div>\
      //       <div class="bar-container">\
      //         <div class="spacer-container" style="height:' + (100 - 44) + '%;"></div>\
      //         <div class="value-container" style="height:' + 23 + '%; line-height:' + 4*2 + 'px;">' + 23 + '\
      //         </div>\
      //         <div class="axis-name">'+$scope.calculator.beltTest.threeMProduct+'</div>\
      //       </div>\
      //     </div>\
      //     </div>\
      //     <div class="grid-wrapper">\
      //       <div class="top-value">' +43 + '</div>\
      //       <div class="middle-value">' + 33 + '</div>\
      //       <div class="bottom-value">0.0</div>\
      //     </div>\
      //   </div>';

      //Html string for report
      // var htmlString = '<div class="intro">\
      //   <p>' + '$scope.config.reportIntroParagraph' + '</p>\
      //   </div>\
      //   <div class="results section-wrapper floatfix">\
      //   <h2>' + '$scope.config.reportResultsTitle' + '</h2>\
      //   <div class="section">\
      //   <h3>' + '$scope.config.reportInputsLabel' + '</h3>\
      //   <div class="table-wrapper">\
      //   <table>\
      //   <tr>\
      //   <td></td>\
      //   <td>' + '$scope.config.reportCompetitorLabel' + '</td>\
      //   <td>' + '$scope.config.report3MLabel' + '</td>\
      //   </tr>\
      //   <tr>\
      //   <td>' + '$scope.config.reportProductNameLabel' + '</td>\
      //   <td>' + '$scope.calculator.beltTest.competitorProduct' + '</td>\
      //   <td>' + '$scope.calculator.beltTest.threeMProduct' + '</td>\
      //   </tr>\
      //   <tr>\
      //   <td>' + '$scope.config.reportTimeProcessLabel' + '</td>\
      //   <td>' + '$scope.calculator.beltTest.competitorPartsPerHour.format()' + '</td>\
      //   <td>' + '$scope.calculator.beltTest.threeMPartsPerHour.format()' + '</td>\
      //   </tr>\
      //   <tr>\
      //   <td>' + '$scope.config.reportPartPerLabel' + '</td>\
      //   <td>' + '$scope.calculator.beltTest.competitorPartsPerBelt.format()' + '</td>\
      //   <td>' + '$scope.calculator.beltTest.threeMPartsPerBelt.format()' + '</td>\
      //   </tr>\
      //   </table>\
      //   </div>\
      //   </div>\
      //   <div class="section">\
      //   <h3 class="bold-header">' + '$scope.config.reportTimeProcessLabel' + '</h3>\
      //   ' + 'fasterGraph' + '\
      //   </div>\
      //   <div class="section">\
      //   <h3 class="bold-header">' + '$scope.config.reportPartPerLabel' + '</h3>\
      //   ' + 'moreCutsGraph' + '\
      //   </div>\
      //   </div>\
      //   <div class="annual-savings section-wrapper floatfix">\
      //   <h2>' + '$scope.config.reportAnnualSavings' + '</h2>\
      //   <div class="section">\
      //   <h3>' + '$scope.config.reportInputsLabel' + '</h3>\
      //   <div class="table-wrapper">\
      //   <table>\
      //   <tr>\
      //   <td></td>\
      //   <td>' + '$scope.config.reportCompetitorLabel' + '</td>\
      //   <td>' + '$scope.config.report3MLabel' + '</td>\
      //   </tr>\
      //   <tr>\
      //   <td>' + '$scope.config.reportProductNameLabel' + '</td>\
      //   <td>' + '$scope.calculator.beltTest.competitorProduct' + '</td>\
      //   <td>' + '$scope.calculator.beltTest.threeMProduct' + '</td>\
      //   </tr>\
      //   <tr>\
      //   <td>' + '$scope.config.reportCostPerBelt' + '</td>\
      //   <td>' + '$scope.config.currency + $scope.calculator.beltTest.competitorCostPerBelt.format(2)' + '</td>\
      //   <td>' + '$scope.config.currency + $scope.calculator.beltTest.threeMCostPerBelt.format(2)' + '</td>\
      //   </tr>\
      //   <tr>\
      //   <td>' + '$scope.config.reportBurdenRate' + '</td>\
      //   <td>' + '$scope.config.currency + $scope.calculator.beltTest.competitorBurdenRatePerHour.format(2)' + '</td>\
      //   <td>' + '$scope.config.currency + $scope.calculator.beltTest.competitorBurdenRatePerHour.format(2)' + '</td>\
      //   </tr>\
      //   <tr>\
      //   <td>' + '$scope.config.reportChangeoverTime' + '</td>\
      //   <td>' + '$scope.calculator.beltTest.competitorChangeOverTime.format()' + '</td>\
      //   <td>' + '$scope.calculator.beltTest.competitorChangeOverTime.format()' + '</td>\
      //   </tr>\
      //   </table>\
      //   </div>\
      //   </div>\
      //   <div class="section">\
      //   <h3>' + '$scope.config.reportResultsLabel' + '</h3>\
      //   <div class="table-wrapper">\
      //   <table>\
      //   <tr>\
      //   <td></td>\
      //   <td>' + '$scope.config.currency' + '</td>\
      //   <td>%</td>\
      //   </tr>\
      //   <tr>\
      //   <td>' + '$scope.config.reportAbrasiveSavingsLabel' + '</td>\
      //   <td>' + '$scope.config.currency + $scope.calculator.beltTest.abrasiveSavingsAmount.format(2)' + '</td>\
      //   <td>' + '$scope.calculator.beltTest.abrasiveSavingsPercent.format()' + '%</td>\
      //   </tr>\
      //   <tr>\
      //   <td>' + '$scope.config.reportChangeoverSavings' + '</td>\
      //   <td>' + '$scope.config.currency + $scope.calculator.beltTest.changeOverSavingsAmount.format(2)' + '</td>\
      //   <td>' + '$scope.calculator.beltTest.changeOverSavingsPercent.format()' + '%</td>\
      //   </tr>\
      //   <tr>\
      //   <td>' + '$scope.config.reportLaborSavings' + '</td>\
      //   <td>' + '$scope.config.currency + $scope.calculator.beltTest.laborSavingsAmount.format(2)' +'</td>\
      //   <td>' + '$scope.calculator.beltTest.laborSavingsPercent.format()' + '%</td>\
      //   </tr>\
      //   <tr>\
      //   <td>' + '$scope.config.reportAnnualSavings' + '</td>\
      //   <td>' + '$scope.config.currency + $scope.calculator.beltTest.annualSavingsAmount.format(2)' + '</td>\
      //   <td>' + '$scope.calculator.beltTest.annualSavingsPercent.format()' + '%</td>\
      //   </tr>\
      //   </table>\
      //   </div>\
      //   </div>\
      //   <div class="section">\
      //   <h3 class="bold-header">' + '$scope.config.reportAnnualCost' + '</h3>\
      //   ' + 'costsGraph' + '\
      //   </div>\
      //   </div>';

      //Variable used to show/hide next button on customer info popover

      var reportParams = {
        templatePath: '../templates/pdf/report.html'
      };

      PDFService.compileHTML($scope, reportParams).then(function(result) {

        $rootScope.isPDFReady = true;
        console.log(result);
        callback(result);

      }, function(e) {
        alert(angular.toJson(e));
      });

    }

    function init() {

      // Storage access
      $scope.customer = StorageService.getAccount('asd-customer');

      // Configurations
      $scope.config = ConfigService.getBeltTestConfigs();
      $scope.calc = {
        calculatorName: $scope.config.calculatorName,
        resultsPerformTitle: $scope.config.resultsPerformTitle,
        resultsSavingsTitle: $scope.config.resultsSavingsTitle,
        resultsBackButtonText: $scope.config.resultsBackButtonText
      };

      // Calculations
      getCalculations();
      StorageService.saveAccount($scope.customer);

      // Chart data
      createChartData();
      createTableData();

      createPDFHtml(function(html) {
        $scope.calculator.beltTestHtml = html;
        $timeout(CalculatorService.saveCalculator($scope.calculator));
      });
    }

    init();

  }
];
