(function () {

    'use strict';

    angular.module('accessnowapp')
    .controller('checkout-controller', ['$scope', 'checkoutService', 'growl', 'storageService', 'paymentService', 'loginService', '$location', 'api', '$rootScope',
        function ($scope, checkoutService, growl, storageService, paymentService, loginService, $location, api, $rootScope) {

            $scope.CheckoutModel = {

                FirstName: "",
                LastName: "",
                Email: "",
                ConfirmEmail: "",
                Address: "",
                City: "",
                ZipCode: "",
                Country: "US",
                Phone: "",
                State: "",
                CompanyName: ""
            };

            $scope.CurrentDomain = storageService.getCurrentDomainToBuy();
            $scope.ShowPaymentInfo = false;
            $scope.Countries = [];
            $scope.DomainAvailability = {
                Available: false,
                Verified: false,
                Verifying: true,
                CanBought: function () {
                    return ($scope.DomainAvailability.Available && $scope.DomainAvailability.Verified);
                },
                Message: ""
            };

            $scope.CheckoutHelper = {

                GetLoggedInUser: function () {
                    loginService.getUser(loginService.getCurrentUserAccesToken())
                    .then(function (user) {
                        if (user.status) {
                            $scope.CheckoutModel.FirstName = user.first_name;
                            $scope.CheckoutModel.LastName = user.last_name;
                            $scope.CheckoutModel.Email = user.email_address;

                            var data = {};
                            data.email = user.email_address;
                            paymentService.getClient(data)
                                .then(function (response) {
                                    if (response.result == "success") {
                                        $scope.ClientId = response.client.id;
                                        var client = response.client;
                                        $scope.CheckoutModel.FirstName = client.firstname;
                                        $scope.CheckoutModel.LastName = client.lastname;
                                        $scope.CheckoutModel.Email = client.email;
                                        $scope.CheckoutModel.Address = client.address1;
                                        $scope.CheckoutModel.ZipCode = client.postcode;
                                        $scope.CheckoutModel.City = client.city;
                                        $scope.CheckoutModel.Country = client.countrycode;
                                        $scope.CheckoutModel.Phone = client.phonenumber;
                                        //$scope.CheckoutModel.Password = client.password;
                                        $scope.CheckoutModel.State = client.state;
                                        $scope.CheckoutModel.CompanyName = client.orgname;
                                    }
                                });
                        }
                    });
                },

                BindExisting: function () {
                    var domainInfo = storageService.getCurrentBillingAndPersonalInfo();
                    if (typeof domainInfo !== 'undefined' && domainInfo != null) {
                        $scope.CheckoutModel.domain = domainInfo.domain;
                        $scope.CheckoutModel.FirstName = domainInfo.firstname;
                        $scope.CheckoutModel.LastName = domainInfo.lastname;
                        $scope.CheckoutModel.Email = domainInfo.emailaddress;
                        $scope.CheckoutModel.Address = domainInfo.streetaddr;
                        $scope.CheckoutModel.ZipCode = domainInfo.zip;
                        $scope.CheckoutModel.City = domainInfo.city;
                        $scope.CheckoutModel.Country = domainInfo.country;
                        $scope.CheckoutModel.Phone = domainInfo.phone;
                        $scope.CheckoutModel.Password = domainInfo.password;
                        $scope.CheckoutModel.State = domainInfo.state;
                        $scope.CheckoutModel.CompanyName = domainInfo.orgname;
                    }
                    $scope.CheckoutHelper.GetLoggedInUser();
                },

                BindCountries: function () {
                    api.getCountries()
                        .then(function (response) {
                            $scope.Countries = response;
                            $scope.CheckoutHelper.BindExisting();
                        });
                },

                VerifyDomain: function () {
                    if (typeof $scope.CurrentDomain === 'undefined') {
                        $scope.DomainAvailability.Verified = true;
                        $scope.DomainAvailability.Verifying = false;
                        $scope.DomainAvailability.CanBought();
                        return;
                    }
                    domainService.verifyDomain({ domain: $scope.CurrentDomain.domain })
                       .then(function (response) {
                           $scope.DomainAvailability.Verified = true;
                           $scope.DomainAvailability.Verifying = false;
                           if (response.status_code == 1000) {
                               $scope.DomainAvailability.Available = true;
                           }
                           else {
                               $scope.DomainAvailability.Message = "Sorry '" + $scope.CurrentDomain.domain + "' is not available now.";
                           }
                           $scope.DomainAvailability.CanBought();
                       }, function (err) {
                           console.log(err);
                           $scope.DomainAvailability.Verified = true;
                           $scope.DomainAvailability.Verifying = false;
                           $scope.DomainAvailability.Message = "Something went wrong, Please try again later.";
                       });
                },

                MoveToPaymentInfo: function () {

                    storageService.setCurrentBillingAndPersonalInfo(
                        {
                            firstname: $scope.CheckoutModel.FirstName,
                            lastname: $scope.CheckoutModel.LastName,
                            emailaddress: $scope.CheckoutModel.Email,
                            streetaddr: $scope.CheckoutModel.Address,
                            zip: $scope.CheckoutModel.ZipCode,
                            city: $scope.CheckoutModel.City,
                            country: $scope.CheckoutModel.Country,
                            phone: $scope.CheckoutModel.Phone,
                            password: $scope.CheckoutModel.Password,
                            state: $scope.CheckoutModel.State,
                            orgname: $scope.CheckoutModel.CompanyName
                        });


                    $location.path('payment-info');
                }
            };

            $scope.CheckoutHelper.BindCountries();

            //$scope.CheckoutHelper.VerifyDomain();

            

        }]);
})();