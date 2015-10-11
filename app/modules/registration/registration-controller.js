(function () {

    'use strict';

    angular.module('accessnowapp')
    .controller('registration-controller', ['$scope', 'RegistrationService', 'growl', '$location', function ($scope, RegistrationService, growl, $location) {


        $scope.RegisterModel = {
            FirstName: "",
            LastName: "",
            Email: "",
            Password: "",
            RecieveNewsLetter: true,
            TermsAndConditions: false,
            IsPrivateUser: true
        };

        $scope.AccountHelper = {

           
            Register: function () {

                RegistrationService.register($scope.RegisterModel)
                .then(function (serverResponse) {

                    if (serverResponse) {
                        $location.path('registration');
                    }

                }, function (error) {
                    growl.error("Something went wrong, please try again later.");
                });
            }
        };

    }]);
})();