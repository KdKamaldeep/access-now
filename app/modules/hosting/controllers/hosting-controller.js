angular.module('accessnowapp')
.controller('hosting-controller', ['$scope', '$rootScope', function ($scope, $rootScope) {

    //Show header promotional message in this controller.
    $rootScope.ShowContainerOverHeader(true);

    //We don't want to show this message except this controller so hide it on destroy.
    $scope.$on("$destroy", function () {
        $rootScope.ShowContainerOverHeader(false);
    });

}]);