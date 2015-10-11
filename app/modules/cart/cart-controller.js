angular.module('accessnowapp')
.controller('cart-controller', ['$scope', 'loginService', '$location', function ($scope, loginService, $location) {
    $scope.StartCheckoutProcess = function () {
        if (loginService.getCurrentUserAccesToken() === '') {
            $location.path('registration');
        }
        else {
            $location.path('checkout');
        }
    };
}]);