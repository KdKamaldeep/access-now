(function () {

    'use strict';

    angular.module('accessnowapp')
    .controller('domain-price-controller', ['$scope', 'domainpriceService', 'growl', '$location', 'loginService', '$routeParams',
        function ($scope, domainpriceService, growl, $location, loginService, $routeParams) {

            $scope.DomainPriceModel = {
                Tld: "",
                RegistrationPrice: "",
                RenewalPrice: "",
                TransferPrice: "",
                MinimumYearOfRegistration: "",
                AllowRegistration: true,
                AllowTransfer: true,
                DomainActive: true
            };
            
            $scope.DomainPrices = [];

            $scope.DomainPriceHelper = {

                Submit: function () {

                    domainpriceService.create({
                        tld: $scope.DomainPriceModel.Tld,
                        token: '1d33b9af44d1841cfe4b68cdadba17fb',//loginService.getCurrentUserAccesToken(),
                        registration_price: $scope.DomainPriceModel.RegistrationPrice,
                        renewal_price: $scope.DomainPriceModel.RenewalPrice,
                        transfer_price: $scope.DomainPriceModel.TransferPrice,
                        minimum_year_of_registration: $scope.DomainPriceModel.MinimumYearOfRegistration,
                        allow_registration: $scope.DomainPriceModel.AllowRegistration,
                        allow_transfer: $scope.DomainPriceModel.AllowTransfer,
                        domain_active: $scope.DomainPriceModel.DomainActive
                    })
                    .then(function (serverResponse) {
                        if (serverResponse.status) {
                            $location.path('admin/domainprice');
                        }
                        else {
                            growl.error(serverResponse.error);
                        }
                    },
                    function (error) {
                        growl.error("Something went wrong, please try again later.");
                    });
                },

                Delete: function (id) {

                    domainpriceService.delete({
                        id: id,
                        token: '1d33b9af44d1841cfe4b68cdadba17fb'
                    })
                    .then(function (serverResponse) {
                        if (serverResponse.status) {
                            $location.path('admin/domainprice');
                        }
                        else {
                            growl.error(serverResponse.error);
                        }
                    },
                    function (error) {
                        growl.error("Something went wrong, please try again later.");
                    });
                },

                Edit: function (id) {

                    domainpriceService.edit({
                        id: id,
                        token: '1d33b9af44d1841cfe4b68cdadba17fb',
                        tld: $scope.DomainPriceModel.Tld,
                        registration_price: $scope.DomainPriceModel.RegistrationPrice,
                        renewal_price: $scope.DomainPriceModel.RenewalPrice,
                        transfer_price: $scope.DomainPriceModel.TransferPrice,
                        minimum_year_of_registration: $scope.DomainPriceModel.MinimumYearOfRegistration,
                        allow_registration: $scope.DomainPriceModel.AllowRegistration,
                        allow_transfer: $scope.DomainPriceModel.AllowTransfer,
                        domain_active: $scope.DomainPriceModel.DomainActive
                    })
                    .then(function (serverResponse) {
                        if (serverResponse.status) {
                            $location.path('admin/domainprice');
                        }
                        else {
                            growl.error(serverResponse.error);
                        }
                    },
                    function (error) {
                        growl.error("Something went wrong, please try again later.");
                    });
                },

                All: function () {
                    domainpriceService.list({ token: '1d33b9af44d1841cfe4b68cdadba17fb' }).then(function (response) {
                        $scope.DomainPrices = response;
                    });
                },

                Get: function (id) {
                    domainpriceService.edit({
                        id: id,
                        token: '1d33b9af44d1841cfe4b68cdadba17fb'//loginService.getCurrentUserAccesToken()
                    })
                    .then(function (response) {
                        $scope.DomainPriceModel.Tld = response.tld;
                        $scope.DomainPriceModel.RegistrationPrice = response.registration_price;
                        $scope.DomainPriceModel.RenewalPrice = response.renewal_price;
                        $scope.DomainPriceModel.TransferPrice = response.transfer_price;
                        $scope.DomainPriceModel.MinimumYearOfRegistration = response.minimum_year_of_registration;
                        $scope.DomainPriceModel.AllowRegistration = response.allow_registration;
                        $scope.DomainPriceModel.AllowTransfer = response.allow_transfer;
                        $scope.DomainPriceMode.DomainActive = response.domain_active;
                    });
                }

            };

            if ($routeParams.id !== undefined && $routeParams.id !== "") {                
                $scope.DomainPriceHelper.Get($routeParams.id);
            }

        }]);
})();