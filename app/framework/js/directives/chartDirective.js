'use strict';

module.exports = [
  function() {
    return {
      restrict: 'E',
      templateUrl: 'framework/templates/chart.html',
      scope: {
        chartData: '='
      },
      link: function(scope) {

        if (scope.chartData.left.value > scope.chartData.right.value) {
          scope.chartData.left.percent = 100;
          scope.chartData.right.percent = (scope.chartData.right.value / scope.chartData.left.value) * 100;
          scope.chartData.higherValue = scope.chartData.left.value;

        } else {
          scope.chartData.left.percent = (scope.chartData.left.value / scope.chartData.right.value) * 100;
          scope.chartData.right.percent = 100;
          scope.chartData.higherValue = scope.chartData.right.value;
        }

        // console.log(scope.chartData);

      }
    };
  }
];
