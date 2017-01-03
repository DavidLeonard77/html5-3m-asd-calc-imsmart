'use strict';
module.exports = [
  '$scope',
  '$state',
  '$rootScope',
  'StorageService',
  '$ionicPopup',
  '$ionicPopover',
  '$window',
  '$filter',
  '$timeout',
  'CalculatorService',
  'ConfigService',
  'PDFService',

  function(
    $scope,
    $state,
    $rootScope,
    StorageService,
    $ionicPopup,
    $ionicPopover,
    $window,
    $filter,
    $timeout,
    CalculatorService,
    ConfigService,
    PDFService
  ) {

    // Track page views
    $rootScope._toState = null; // Prevent event from firing twice
    $rootScope.$on('$stateChangeSuccess',
      function(event, toState) {

        if ($rootScope._toState !== toState.name) {
          $rootScope._toState = angular.copy(toState.name);
          macs.trackSection(toState.name, function() {}, function() {});
        }

      }
    );

    //Checking whether a report is ready or not for displaying next button on customer info popover
    $rootScope.isPDFReady = false;
    $scope.onResultPage = false;

    //Customer info popover
    $ionicPopover.fromTemplateUrl('framework/templates/customer-info-popover.html', {
      scope: $scope
    }).then(function(popover) {
      $scope.customerInfoPopover = popover;
    });

    $scope.showCustomerInfoPopover = function($event) {
      $scope.customerInfoPopover.show($event);
      console.log($state.current.name);
      if ($state.current.name === '3m-asd-calc.belt-test-end-of-life-results' ||
        $state.current.name === '3m-asd-calc.scotch-bright-results' ||
        $state.current.name === '3m-asd-calc.cut-off-wheel-results' ||
        $state.current.name === '3m-asd-calc.depressed-center-results' ||
        $state.current.name === '3m-asd-calc.disk-test-results' ||
        $state.current.name === '3m-asd-calc.belt-test-end-of-life-results-split' ||
        $state.current.name === '3m-asd-calc.scotch-bright-results-split' ||
        $state.current.name === '3m-asd-calc.cut-off-wheel-results-split' ||
        $state.current.name === '3m-asd-calc.depressed-center-results-split' ||
        $state.current.name === '3m-asd-calc.disk-test-results-split') {
        $scope.onResultPage = true;
      } else {
        $scope.onResultPage = false;
      }
    };

    //Share popover
    $ionicPopover.fromTemplateUrl('framework/templates/share-popover.html', {
      scope: $scope
    }).then(function(popover) {
      $scope.sharePopover = popover;
    });

    $scope.showSharePopover = function($event) {
      $scope.saveCustomer($scope.customer);
      // if ($state.current.name === '3m-asd-calc.belt-test-end-of-life-results') {
      $scope.customerInfoPopover.hide();
      $scope.sharePopover.show($event);
      // }
    };

    //Testing whether current state is calculator's first page or not
    $scope.isStart = function() {
      return ($state.current.name === '3m-asd-calc.belt-test-end-of-life-start');
    };

    //Storage access
    $scope.customer = StorageService.getAccount('asd-customer');
    $scope.companyName = '';
    $scope.date = $filter('date')(new Date(), 'MMMM d, yyyy');
    $scope.cLocation = '';
    $scope.application = '';
    $scope.contact = '';
    $scope.comments = '';
    if (!$scope.customer) {
      $scope.customer = {
        name: 'customer',
        companyName: '',
        date: $filter('date')(new Date(), 'MMMM d, yyyy'),
        cLocation: '',
        application: '',
        contact: '',
        comments: ''
      };
      StorageService.addAccount($scope.customer);
    } else {
      $scope.companyName = $scope.customer.companyName;
      $scope.date = $scope.customer.date;
      $scope.cLocation = $scope.customer.cLocation;
      $scope.application = $scope.customer.application;
      $scope.contact = $scope.customer.contact;
      $scope.comments = $scope.customer.comments;
    }

    //Clear customer information
    $scope.clearInfo = function() {
      $scope.customer.companyName = '';
      $scope.customer.date = '';
      $scope.customer.cLocation = '';
      $scope.customer.application = '';
      $scope.customer.contact = '';
      $scope.customer.comments = '';
    };

    //Settings popup
    $scope.goSettings = function() {

      // cordova.plugins.Keyboard.disableScroll(true);
      $scope.settingsPopup = $ionicPopup.show({
        templateUrl: 'framework/templates/settings.html',
        scope: $scope,
        cssClass: 'personal-settings-popup'
      });
    };

    function saveReportData(reportName, reportData, action) {

      reportData.beltTestHtml = null;
      reportData.DepressedCenterHtml = null;
      reportData.DiskTestHtml = null;
      reportData.scotchBrightHtml = null;

      var reportDataURI = encodeURI(angular.toJson(reportData));

      macs.saveItemUserData(
        'mmm-val-calcs', // app name
        reportName, // app key
        reportDataURI, // value
        '1', // privacy
        function(saveResult) {

          // Track event
          var args = {
            'eVar37': action, // 'save' or 'email'
            'eVar38': reportName, // calculator name
            'eVar39': saveResult.items, // uid of saved report
            'events': 'event36'
          };
          macs.trackEvent(args, function() {}, function() {});

        }, function() {}
      );
    }

    //Email report
    $scope.openReport = function(action) {
      $scope.sharePopover.hide();

      var getBccAddress = function() {
        var configs = ConfigService.getBeltTestConfigs();
        var bccAddressList = [];
        var bccValidAddressList = [];
        var emailValidation = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var bccAddress = configs.bccAddress;
        if (bccAddress) {
          bccAddressList = bccAddress.split('|');
          angular.forEach(bccAddressList, function(emailAddress) {
            if (emailValidation.test(emailAddress) === true) {
              bccValidAddressList.push(emailAddress);
            }
          });
        }
        return bccValidAddressList;
      };

      //Plugin test code PDF Convert.
      // var htmlString = '';
      // var css;
      //
      // //Header part of Belt Test calculator report
      // var currentState = $state.current.name.split('.')[1]
      // if ($state.current.name === '3m-asd-calc.belt-test-end-of-life-results') {
      //   css = 'calculators/belt-test-end-of-life/css/'belt-test-end-of-life'-pdf.css';
      //     // preHeader = '<html><head>\
      //     //   <link rel="stylesheet" type="text/css" href="calculators/belt-test-end-of-life/css/belt-test-end-of-life-pdf.css">';
      // } else if ($state.current.name === '3m-asd-calc.scotch-bright-results') {
      //     preHeader = '<html><head>\
      //       <link rel="stylesheet" type="text/css" href="calculators/scotch-bright/css/scotch-bright-pdf.css">';
      // } else if ($state.current.name === '3m-asd-calc.cut-off-wheel-results' ||
      //     $state.current.name === '3m-asd-calc.cut-off-wheel-results-split') {
      //     preHeader = '<html><head>\
      //       <link rel="stylesheet" type="text/css" href="calculators/cut-off-wheel/css/cut-off-wheel-pdf.css">';
      // } else if ($state.current.name === '3m-asd-calc.depressed-center-results' ||
      //     $state.current.name === '3m-asd-calc.depressed-center-results-split') {
      //     preHeader = '<html><head>\
      //       <link rel="stylesheet" type="text/css" href="calculators/depressed-center/css/depressed-center-pdf.css">';
      // } else if ($state.current.name === '3m-asd-calc.disk-test-results' ||
      //     $state.current.name === '3m-asd-calc.disk-test-results-split') {
      //     preHeader = '<html><head>\
      //       <link rel="stylesheet" type="text/css" href="calculators/disk-test/css/disk-test-pdf.css">';
      // }
      //
      // var beltTestHtmlHeader = '<div class="header floatfix">\
      //   <div><img src="calculators/calculator-common/img/logo-pdf.png"></div>\
      //   <div>\
      //   <p>' + $scope.settings.userName + '</p>\
      //   <p>' + $scope.settings.phone + '</p>\
      //   <p>' + $scope.settings.email + '</p>\
      //   </div>\
      //   </div>';

      //Footer part of Belt Test calculator report
      // var beltTestHtmlFooter = ' <div class="customer-info section-wrapper floatfix">\
      //   <h2>Customer Info</h2>\
      //   <table class="info-table">\
      //   <tr>\
      //   <td>Location:<br>' + $scope.customer.cLocation + '</td>\
      //   <td>Contact:<br>' + $scope.customer.contact + '</td>\
      //   </tr>\
      //   <tr>\
      //   <td>Company Name: ' + $scope.customer.companyName + '</td>\
      //   <td>Application: ' + $scope.customer.application + '</td>\
      //   </tr>\
      //   <tr>\
      //   <td>Date: ' + $scope.customer.date + '</td>\
      //   <td>Comments: ' + $scope.customer.comments + '</td>\
      //   </tr>\
      //   </table>\
      //   </div>\
      //   </div>\
      //   </body>\
      //   </html>';
      //
      // var disclaimer = '<div class="pdf-disclaimer"><p><b>Disclaimer:</b></p><p>Warranty, Limited Remedy, and Disclaimer: Many factors beyond 3M\'s control and uniquely \
      //   within user\'s knowledge and control can affect the use and performance of a 3M product in \
      //   a particular application. User is solely responsible for evaluating the 3M product and determining \
      //   whether it is fit for a particular purpose and suitable for             user\'s method of application.</p><p> \
      //   Unless an additional warranty is specifically stated on the applicable 3M product packaging or product \
      //   literature, 3M warrants that each 3M product meets the applicable 3M product specification at the time 3M \
      //   ships the product. 3M MAKES NO OTHER WARRANTIES OR CONDITIONS, EXPRESS OR IMPLIED, INCLUDING, BUT NOT \
      //   LIMITED TO, ANY IMPLIED WARRANTY OR CONDITION OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE OR \
      //   ANY IMPLIED WARRANTY OR CONDITION ARISING OUT OF A COURSE OF DEALING, CUSTOM OR USAGE OF TRADE. If the 3M \
      //   product does not conform to this warranty, then the sole and exclusive remedy is, at 3M\'s option, \
      //   replacement of the 3M product or refund of the purchase price.\
      //   </p><p>\
      //   Limitation of Liability: Except where prohibited by law, 3M will not be liable for any loss or \
      //   damage arising from the 3M product, whether direct, indirect, special, incidental or consequential, \
      //   regardless of the legal theory asserted, including warranty, contract, negligence or strict liability.</p></div>';

      // if($state.current.name === '3m-asd-calc.belt-test-end-of-life-results'){
      //     var beltTestHtmlPart1 = CalculatorService.calculator('3M-ASD-Belt-Test-Calculator').beltTestHtml;
      //     var beltTestHtml = beltTestHtmlHeader + beltTestHtmlPart1 + beltTestHtmlFooter;
      //     var reportName = 'Belt Test Report';
      //   htmlString = encodeURI(beltTestHtml);
      // }

      //var beltTestHtmlPart1 = '';
      var reportName = '';
      var reportData = '';
      //var reportDataURI = '';

      var currentStateName = $state.current.name.split('.')[1];
      switch (currentStateName) {

        case 'belt-test-end-of-life-results':
          reportName = 'BeltTest';
          reportData = angular.copy(CalculatorService.calculator('3M-ASD-Belt-Test-Calculator'));
          $scope.reportHTML = angular.copy(reportData.beltTestHtml);
          break;

        case 'scotch-bright-results':
          reportName = 'ScotchBrite';
          reportData = angular.copy(CalculatorService.calculator('3M-ASD-Scotch-Bright-Calculator'));
          $scope.reportHTML = angular.copy(reportData.scotchBrightHtml);
          break;

        case 'cut-off-wheel-results':
          reportName = 'CutOffWheel';
          reportData = angular.copy(CalculatorService.calculator('3M-ASD-Cut-Off-Wheel-Calculator'));
          $scope.reportHTML = angular.copy(reportData.cutOffWheelHtml);
          break;

        case 'depressed-center-results':
          reportName = 'DepressedCenter';
          reportData = angular.copy(CalculatorService.calculator('3M-ASD-Depressed-Center-Calculator'));
          $scope.reportHTML = angular.copy(reportData.DepressedCenterHtml);
          break;

        case 'disk-test-results':
          reportName = 'DiscTest';
          reportData = angular.copy(CalculatorService.calculator('3M-ASD-Disk-Test-Calculator'));
          $scope.reportHTML = angular.copy(reportData.DiskTestHtml);
          break;
      }

      // var beltTestHtml = beltTestHtmlHeader + beltTestHtmlPart1 + beltTestHtmlFooter + disclaimer;

      // console.log(beltTestHtml);


      // Save scope data back to macs and track
      saveReportData(reportName, reportData, action);

      var cssPath = document.getElementsByTagName('link')[0].href;

      switch (action) {

        case 'email':

          // Compile and Email PDF
          PDFService.emailPDF(
            $scope, {
              subject: '3M Abrasives Product Test Results',
              message: 'Thank you for evaluating our 3M Abrasive products.<br><br>Below is your personalized analysis showing the results to the latest product testing we conducted in your facility. We appreciate the opportunity to work with your company and share with you the benefits of using 3M.',
              to: '',
              cc: '',
              bcc: getBccAddress().join(';')
            }, {
              title: reportName,
              templatePath: 'framework/templates/pdf/wrapper.html',
              cssPath: cssPath
            }
          ).then(function() {}, function() {});

          break;

        case 'save':

          // Compile and Email PDF
          PDFService.savePDF(
            $scope, {
              templatePath: 'framework/templates/pdf/wrapper.html',
              cssPath: cssPath
            }
          ).then(function() {}, function() {});

          // Save to file
          // macs.convertHTMLToPDF({
          //     'pageContent': htmlString
          // }, function(response) {
          //
          //     // Save to session
          //     macs.getPathForConvertedPDFFileFromHTML({
          //         'pageContent': htmlString,
          //         'generatedPDFName': response.itemName
          //     }, function(result) {
          //
          //         // View from session
          //         macs.viewAsset(result.filePath, function(e) {});
          //     });
          //
          // }, function(e) {});
          break;
      }

    };

    //Save customer information
    $scope.saveCustomer = function(account) {
      $scope.customer = StorageService.getAccount('asd-customer');
      $scope.customer.companyName = account.companyName;
      $scope.customer.date = $filter('date')(account.date, 'MMMM d, yyyy');
      $scope.customer.cLocation = account.cLocation;
      $scope.customer.application = account.application;
      $scope.customer.contact = account.contact;
      $scope.customer.comments = account.comments;
      StorageService.saveAccount($scope.customer);
    };

    //Personal settings
    $scope.settings = StorageService.getAccount('asd-settings');
    $scope.userName = '';
    $scope.phone = '';
    $scope.email = '';
    if (!$scope.settings) {
      $scope.settings = {
        name: 'settings',
        userName: '',
        phone: '',
        email: ''
      };
      StorageService.addAccount($scope.settings);
    } else {
      $scope.userName = $scope.settings.userName;
      $scope.phone = $scope.settings.phone;
      $scope.email = $scope.settings.email;
    }

    //Save settings
    $scope.savePersonalDetails = function(settingsPopup, form) {
      // cordova.plugins.Keyboard.disableScroll(false);
      if (!form.$invalid) {
        StorageService.saveAccount($scope.settings);
        settingsPopup.close();
      }
    };

  }
];
