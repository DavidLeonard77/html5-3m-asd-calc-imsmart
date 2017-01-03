'use strict';

/**
 * @ngdoc overview
 * @name 3m-asd
 * @description
 * # Initializes main application and routing
 *
 * Main module of the application.
 */

angular.module( '3m-asd', [
  'ionic',
  'ngCordova',
  'ngResource',
  'ui.utils.masks',
  'angular-decimals'
] )

.run( [
  '$ionicPlatform',
  '$rootScope',
  '$timeout',
  'ConfigService',

  function(
    $ionicPlatform,
    $rootScope,
    $timeout,
    ConfigService
  ) {

  // Setup initial filter list
  $ionicPlatform.ready(function() {

    $rootScope.macsAlive = false;
    macs.initApi(function(){
      $rootScope.macsAlive = true;
    });

    $timeout(function(){

      ConfigService.initialize().then(function(data) { });

    }, 200);

  });

} ] )

.config( [
  '$httpProvider',
  '$stateProvider',
  '$urlRouterProvider',

  function(
    $httpProvider,
    $stateProvider,
    $urlRouterProvider
  ) {

    // Application routing
    $stateProvider
      .state('3m-asd-calc', {
        url: '/3m-asd-calc',
        abstract: true,
        templateUrl: 'framework/templates/menu.html',
        controller: 'MainCtrl',
        resolve: {
          dataReady: function($log, ConfigService) {
            // initialize configurations
            return ConfigService.initialize().then(function(data) { });
          }
        }
      })

      // belt-test-end-of-life
      .state('3m-asd-calc.belt-test-end-of-life-start', {
        url: '/belt-test-end-of-life-start',
        views: {
          'menuContent': {
            templateUrl: 'framework/templates/start.html',
            controller: 'BeltTestStartCtrl'
          }
        }
      })
      .state('3m-asd-calc.belt-test-end-of-life-performance', {
        url: '/belt-test-end-of-life-performance',
        views: {
          'menuContent': {
            templateUrl: 'framework/templates/input.html',
            controller: 'BeltTestPerformanceCtrl'
          }
        }
      })
      .state('3m-asd-calc.belt-test-end-of-life-savings', {
        url: '/belt-test-end-of-life-savings',
        views: {
          'menuContent': {
            templateUrl: 'framework/templates/input.html',
            controller: 'BeltTestSavingsCtrl'
          }
        }
      })
      .state('3m-asd-calc.belt-test-end-of-life-results', {
        url: '/belt-test-end-of-life-results',
        views: {
          'menuContent': {
            templateUrl: 'framework/templates/results.html',
            controller: 'BeltTestResultsCtrl'
          }
        }
      })

      // scotch-bright
      .state('3m-asd-calc.scotch-bright-start', {
        url: '/scotch-bright-start',
        views: {
          'menuContent': {
            templateUrl: 'framework/templates/start.html',
            controller: 'ScotchBrightStartCtrl'
          }
        }
      })
      .state('3m-asd-calc.scotch-bright-performance', {
        url: '/scotch-bright-performance',
        views: {
          'menuContent': {
            templateUrl: 'framework/templates/input.html',
            controller: 'ScotchBrightPerformanceCtrl'
          }
        }
      })
      .state('3m-asd-calc.scotch-bright-savings', {
        url: '/scotch-bright-savings',
        views: {
          'menuContent': {
            templateUrl: 'framework/templates/input.html',
            controller: 'ScotchBrightSavingsCtrl'
          }
        }
      })
      .state('3m-asd-calc.scotch-bright-results', {
        url: '/scotch-bright-results',
        views: {
          'menuContent': {
            templateUrl: 'framework/templates/results.html',
            controller: 'ScotchBrightResultsCtrl'
          }
        }
      })

      // depressed-center
      .state('3m-asd-calc.depressed-center-start', {
        url: '/depressed-center-start',
        views: {
          'menuContent': {
            templateUrl: 'framework/templates/start.html',
            controller: 'DepressedCenterStartCtrl'
          }
        }
      })
      .state('3m-asd-calc.depressed-center-performance', {
        url: '/depressed-center-performance',
        views: {
          'menuContent': {
            templateUrl: 'framework/templates/input.html',
            controller: 'DepressedCenterPerformanceCtrl'
          }
        }
      })
      .state('3m-asd-calc.depressed-center-savings', {
        url: '/depressed-center-savings',
        views: {
          'menuContent': {
            templateUrl: 'framework/templates/input.html',
            controller: 'DepressedCenterSavingsCtrl'
          }
        }
      })
      .state('3m-asd-calc.depressed-center-results', {
        url: '/depressed-center-results',
        views: {
          'menuContent': {
            templateUrl: 'framework/templates/results.html',
            controller: 'DepressedCenterResultsCtrl'
          }
        }
      })

      // cut-off-wheel
      .state('3m-asd-calc.cut-off-wheel-start', {
        url: '/cut-off-wheel-start',
        views: {
          'menuContent': {
            templateUrl: 'framework/templates/start.html',
            controller: 'CutOffWheelStartCtrl'
          }
        }
      })
      .state('3m-asd-calc.cut-off-wheel-performance', {
        url: '/cut-off-wheel-performance',
        views: {
          'menuContent': {
            templateUrl: 'framework/templates/input.html',
            controller: 'CutOffWheelPerformanceCtrl'
          }
        }
      })
      .state('3m-asd-calc.cut-off-wheel-savings', {
        url: '/cut-off-wheel-savings',
        views: {
          'menuContent': {
            templateUrl: 'framework/templates/input.html',
            controller: 'CutOffWheelSavingsCtrl'
          }
        }
      })
      .state('3m-asd-calc.cut-off-wheel-results', {
        url: '/cut-off-wheel-results',
        views: {
          'menuContent': {
            templateUrl: 'framework/templates/results.html',
            controller: 'CutOffWheelResultsCtrl'
          }
        }
      })

      // disk-test
      .state('3m-asd-calc.disk-test-start', {
        url: '/disk-test-start',
        views: {
          'menuContent': {
            templateUrl: 'framework/templates/start.html',
            controller: 'DiskTestStartCtrl'
          }
        }
      })
      .state('3m-asd-calc.disk-test-performance', {
        url: '/disk-test-performance',
        views: {
          'menuContent': {
            templateUrl: 'framework/templates/input.html',
            controller: 'DiskTestPerformanceCtrl'
          }
        }
      })
      .state('3m-asd-calc.disk-test-savings', {
        url: '/disk-test-savings',
        views: {
          'menuContent': {
            templateUrl: 'framework/templates/input.html',
            controller: 'DiskTestSavingsCtrl'
          }
        }
      })
      .state('3m-asd-calc.disk-test-results', {
        url: '/disk-test-results',
        views: {
          'menuContent': {
            templateUrl: 'framework/templates/results.html',
            controller: 'DiskTestResultsCtrl'
          }
        }
      });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('3m-asd-calc/belt-test-end-of-life-start');
  }
] )

// Angular module directives
.directive (   'angularInputMasks',              require( './framework/js/directives/angularInputMasks' ) )
.directive (   'chartDirective',                 require( './framework/js/directives/chartDirective' ) )

// Angular module services
.factory   (   'ConfigService',                  require( './framework/js/services/ConfigService' ) )
.factory   (   'CalculatorService',              require( './framework/js/services/CalculatorService' ) )
.factory   (   'PDFService',                     require( './framework/js/services/PDFService' ) )
.factory   (   'StorageService',                 require( './framework/js/services/StorageService' ) )
.factory   (   'StorageBackend',                 require( './framework/js/services/StorageBackend' ) )

// Angular module filters
// .filter    (   'percentage',                     require( './filters/percentageFilter' ) )

// Angular module controllers
.controller(   'MainCtrl',                       require( './framework/js/controllers/mainController' ) )
.controller(   'ShareCtrl',                      require( './framework/js/controllers/shareController' ) )

// Belt Test
.controller(   'BeltTestStartCtrl',              require( './calculators/belt-test-end-of-life/js/start.js' ) )
.controller(   'BeltTestPerformanceCtrl',        require( './calculators/belt-test-end-of-life/js/performance.js' ) )
.controller(   'BeltTestSavingsCtrl',            require( './calculators/belt-test-end-of-life/js/savings.js' ) )
.controller(   'BeltTestResultsCtrl',            require( './calculators/belt-test-end-of-life/js/results.js' ) )

// Cut Off Wheel
.controller(   'CutOffWheelStartCtrl',           require( './calculators/cut-off-wheel/js/start.js' ) )
.controller(   'CutOffWheelPerformanceCtrl',     require( './calculators/cut-off-wheel/js/performance.js' ) )
.controller(   'CutOffWheelSavingsCtrl',         require( './calculators/cut-off-wheel/js/savings.js' ) )
.controller(   'CutOffWheelResultsCtrl',         require( './calculators/cut-off-wheel/js/results.js' ) )

// Depressed Wheel
.controller(   'DepressedCenterStartCtrl',       require( './calculators/depressed-center/js/start.js' ) )
.controller(   'DepressedCenterPerformanceCtrl', require( './calculators/depressed-center/js/performance.js' ) )
.controller(   'DepressedCenterSavingsCtrl',     require( './calculators/depressed-center/js/savings.js' ) )
.controller(   'DepressedCenterResultsCtrl',     require( './calculators/depressed-center/js/results.js' ) )

// Disk Test
.controller(   'DiskTestStartCtrl',              require( './calculators/disk-test/js/start.js' ) )
.controller(   'DiskTestPerformanceCtrl',        require( './calculators/disk-test/js/performance.js' ) )
.controller(   'DiskTestSavingsCtrl',            require( './calculators/disk-test/js/savings.js' ) )
.controller(   'DiskTestResultsCtrl',            require( './calculators/disk-test/js/results.js' ) )

// Scotch Bright
.controller(   'ScotchBrightStartCtrl',          require( './calculators/scotch-bright/js/start.js' ) )
.controller(   'ScotchBrightPerformanceCtrl',    require( './calculators/scotch-bright/js/performance.js' ) )
.controller(   'ScotchBrightSavingsCtrl',        require( './calculators/scotch-bright/js/savings.js' ) )
.controller(   'ScotchBrightResultsCtrl',        require( './calculators/scotch-bright/js/results.js' ) )

;
