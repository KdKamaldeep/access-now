angular.module('accessnowapp')
.controller('contact-us-controller', ['$scope', function ($scope) {
    $scope.ContactModel = {
        Name: "",
        Email: "",
        Message: ""
    };

    $scope.SaveContactRequest = function () {
        //TODO: Save contact request.
    };

}]);