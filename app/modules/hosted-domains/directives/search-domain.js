(function () {
    'use strict';
    angular.module('accessnowapp')
    .directive('searchDomain', ['domainService', 'growl', '$location', 'storageService', 'loginService', 'ngCart',
         function (domainService, growl, $location, storageService, loginService, ngCart) {
             return {
                 restrict: 'EA',
                 replace: true,
                 scope: {
                     callback: '='
                 },
                 templateUrl: 'modules/hosted-domains/directives/search-domain.html',
                 link: function (scope, element, attr) {


                     scope.DomainName = "";
                     scope.Error = "";
                     scope.DomainAvailable = "";
                     scope._statusCode;
                     scope.LodingClass = "";
                     scope.StatusCode = {
                         AVAILABLE: function () {
                             return scope._statusCode === 1000;
                         },
                         UNAVAILABLE: function () {
                             return scope._statusCode === 1004;
                         },
                         FAILURE: function () {
                             return (scope._statusCode === 1001 || scope._statusCode === 1003);
                         }
                     };

                     scope.AddInCart = true;


                     scope.DomainHelper = {

                         Verify: function () {
                             if (scope.DomainName === '')
                                 return;

                             scope.AddInCart = true;
                             scope.DomainAvailable = "";
                             scope.LodingClass = "loding_center";

                             var ext = $(".selected-text").html();
                             scope._statusCode = 0;
                             domainService.verifyDomain({ domain: scope.DomainName + ext })
                             .then(function (response) {
                                 scope.DomainAvailable = angular.copy(scope.DomainName) + ext;
                                 scope._statusCode = response.status_code;

                                 //TODO: Open a popup for user saying we have domain available.
                                 if (scope.callback !== undefined) {
                                     scope.callback(response);
                                 }
                                 scope.LodingClass = "";
                             }, function () {
                                 scope.LodingClass = "";
                             });
                         },

                         MoveToCheckout: function () {

                             if (scope.AddInCart) {
                                 var id = Math.floor((Math.random() * 10000) + 1);
                                 ngCart.addItem(id, scope.DomainAvailable, 25, 1, null, 1);
                                 scope.AddInCart = false;
                                 growl.success('One item added to cart.');
                             }
                             else {
                                 $location.path('cart');
                             }
                         }

                     }
                 }
             };
         }]);
})();