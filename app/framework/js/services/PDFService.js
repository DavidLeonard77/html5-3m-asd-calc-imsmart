'use strict';

module.exports = [
  '$templateCache',
  '$compile',
  '$timeout',
  '$http',
  '$q',

  function(
    $templateCache,
    $compile,
    $timeout,
    $http,
    $q
  ) {

    /**
     * @ngdoc function
     * @name service:PDFService.getDataURI
     * @param (url) expects a file path for the image
     * @return resolves with a data URI of the image
     * @description convert images into data URIs
     * # PDFService.getDataURI
     */
    var getDataURI = function(url) {
      return $q(function(resolve) {
        var image = new Image();

        image.onload = function() {
          var canvas = document.createElement('canvas');
          canvas.width = this.naturalWidth;
          canvas.height = this.naturalHeight;

          canvas.getContext('2d').drawImage(this, 0, 0);

          // Get raw image data
          // callback(canvas.toDataURL('image/png').replace(/^data:image\/(png|jpg);base64,/, ''));

          // ... or get as Data URI
          resolve(canvas.toDataURL('image/png'));
        };

        image.src = url;
      });
    };

    // // Usage
    // PDFService.getDataURI('/logo.png').then(function(dataURI) {
    //   $scope.imageDataURI = dataURI;
    //   // And in your template <img src="{{imageDataURI}}" border="0" />
    // });


    /**
     * @ngdoc function
     * @name service:PDFService.wrapHTML
     * @param (html) expects string
     * @param (css) expects string
     * @return string
     * @description wraps compiled template html
     * # PDFService.wrapHTML
     */
    var wrapHTML = function(html, css) {
      var wrap = '<html>';
      if (css) {
        wrap += '<style>' + css + '</style>';
      }
      wrap += '<body class="pdf-page">' + html + '</body></html>';
      return wrap;
    };


    /**
     * @ngdoc function
     * @name service:PDFService.compileHTML
     * @param (scope) expects a scoped angular object
     * @param (params) expects an object
     * @return resolves with a compiled HTML string
     * @description compiles html content
     * # PDFService.compileHTML
     */
    var compileHTML = function(scope, params, shouldWrap) {
      return $q(function(resolve, reject) {

        // Reject if no template
        if (!params || !params.templatePath) {
          reject('No template path provided');

        } else {

          var templateHTML = '';
          var compiledHTML = {};

          compiledHTML = $compile($templateCache.get(params.templatePath))(scope);
          console.log($templateCache.get(params.templatePath));
          console.log($templateCache.get('../' + params.templatePath));
          console.log($templateCache.get('../../' + params.templatePath));
          // Compile html
          $timeout(function() {

            for (var i = 0; i < compiledHTML.length; i++) {
              templateHTML += compiledHTML[i].outerHTML;
            }

            // Get style
            if (params.cssPath && shouldWrap) {
              $http.get(params.cssPath).then(function successCallback(style) {

                resolve(wrapHTML(templateHTML, style.data.toString()));

              }, function errorCallback(e) {
                reject(e);
              });

              // No style provided
            } else {
              resolve(templateHTML);
            }
          }, 100);

        }

      });
    };

    // // Sample Usage
    // var pdfParams = {
    //   templatePath: 'templates/pdf.html',  // required
    //   cssPath:      'styles/main.css'
    // };
    //
    // PDFService.compileHTML( $scope, pdfParams ).then(function( result ){
    //   console.log(result);
    // },function(e){
    //   alert(angular.toJson(e));
    // });


    /**
     * @ngdoc function
     * @name service:PDFService.savePDF
     * @param (scope) expects a scoped angular object
     * @param (pdfParams) expects an object
     * @return resolves or rejects with the error
     * @description creates and saves an IMSmart PDF asset
     * # PDFService.savePDF
     */
    var savePDF = function(scope, pdfParams) {
      return $q(function(resolve, reject) {

        // Compile HTML
        compileHTML(scope, pdfParams, true).then(
          function(compiledHTML) {
            console.log(compiledHTML);
            resolve();

            // Save to file
            macs.convertHTMLToPDF({
              'pageContent': encodeURIComponent(compiledHTML)
            }, function(response) {

              // Get filepath
              macs.getPathForConvertedPDFFileFromHTML({
                'pageContent': encodeURIComponent(compiledHTML),
                'generatedPDFName': response.itemName
              }, function(result) {

                // View from session
                macs.viewAsset(result.filePath, function() {});

                resolve();

              }, function(e) {
                reject(e);
              });
            }, function(e) {
              reject(e);
            });
          },
          function(e) {
            reject(e);
          }
        );

      });
    };

    // // Sample Usage
    // var pdfParams = {
    //   title:        '',
    //   templatePath: 'templates/pdf.html',  // required
    //   cssPath:      'styles/main.css'
    // };
    //
    // PDFService.savePDF( $scope, pdfParams ).then(function(){
    //   console.log('yay');
    // },function(e){
    //   alert(angular.toJson(e));
    // });


    /**
     * @ngdoc function
     * @name service:PDFService.emailPDF
     * @param (scope) expects a scoped angular object
     * @param (emailParams) expects an object
     * @param (pdfParams) expects an object
     * @return resolves or rejects with the error
     * @description creates and emails an IMSmart PDF asset
     * # PDFService.savePDF
     */
    var emailPDF = function(scope, emailParams, pdfParams) {
      return $q(function(resolve, reject) {

        // Compile HTML
        compileHTML(scope, pdfParams, true).then(
          function(compiledHTML) {
            console.log(compiledHTML);

            var pdfName = pdfParams && pdfParams.title ? pdfParams.title : 'document';

            // Save to session
            macs.getPathForConvertedPDFFileFromHTML({
              'pageContent': encodeURIComponent(compiledHTML),
              'generatedPDFName': pdfName
            }, function(result) {

              // Email PDF
              macs.emailWithMultipleAssets({
                email: emailParams,
                assets: result.filePath
              });

              resolve();

            }, function(e) {
              reject(e);
            });
          },
          function(e) {
            reject(e);
          }
        );

      });
    };

    // // Sample Usage
    // var emailParams = {
    //   subject:      '',
    //   message:      '',
    //   to:           '',
    //   cc:           '',
    //   bcc:          ''
    // };
    //
    // var pdfParams = {
    //   title:        '',
    //   templatePath: 'templates/pdf.html',  // required
    //   cssPath:      'styles/main.css'
    // };
    //
    // PDFService.emailPDF( $scope, emailParams, pdfParams ).then(function(){
    //   console.log('yay');
    // },function(e){
    //   alert(angular.toJson(e));
    // });


    // public api
    return {
      getDataURI: getDataURI,
      compileHTML: compileHTML,
      savePDF: savePDF,
      emailPDF: emailPDF
    };
  }
];
