(function () {

    'use strict';

    angular.module('accessnowapp')
    .controller('login-controller', ['$scope', 'loginService', 'growl', '$location', 'storageService', 'api', '$routeParams',
    function ($scope, loginService, growl, $location, storageService, api, $routeParams) {

        $scope.LoginModel = {
            Email: "",
            Password: "",
        };

        if ($routeParams.returnUrl !== undefined && $routeParams.returnUrl.indexOf('checkout') >= 0) {
            storageService.startCheckout();
        }

        $scope.CurrentDomain = storageService.getCurrentDomainToBuy();

        $scope.SignUpModel = {
            FirstName: "",
            LastName: "",
            Email: "",
            Password: "",
            RecieveNewsLetter: true,
            TermsAndConditions: false,
            IsPrivateUser: true,
            Country: "US"
        };

        $scope.AccountHelper = {

            BindCountries: function () {
                api.getCountries()
                   .then(function (response) {
                       $scope.Countries = response;
                   });
            },

            Login: function () {

                loginService.login({
                    emailaddress: $scope.LoginModel.Email,
                    password: $scope.LoginModel.Password
                })
                .then(function (serverResponse) {

                    if (serverResponse.status) {
                        loginService.setCredentials(serverResponse);

                        if (!storageService.checkoutInProgress()) {
                            $location.path("/");
                        }
                        else {
                            $location.path("checkout"); //Redirect to home page need TODO: It would be user dashboard.
                        }
                    }
                    else {
                        growl.error("Invalid Username/Password");
                    }

                }, function (error) {
                    growl.error("Something went wrong, please try again later.");
                });
            },

            SignUp: function () {

                loginService.signUp({
                    firstname: $scope.SignUpModel.FirstName,
                    lastname: $scope.SignUpModel.LastName,
                    emailaddress: $scope.SignUpModel.Email,
                    password: $scope.SignUpModel.Password,
                    recievenewsletter: $scope.SignUpModel.RecieveNewsLetter,
                    privateuser: $scope.SignUpModel.IsPrivateUser
                })
                .then(function (serverResponse) {

                    if (serverResponse.status) {
                        loginService.setCredentials(serverResponse);

                        if (!storageService.checkoutInProgress()) {
                            $location.path("/");
                        }
                        else {
                            $location.path("checkout");
                        }
                    }
                    else {
                        growl.error(serverResponse.error);
                    }

                }, function (error) {
                    growl.error("Something went wrong, please try again later.");
                });
            }
        };



    }]);
})();