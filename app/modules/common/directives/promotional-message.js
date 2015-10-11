angular.module('accessnowapp')
.directive('promotionalMessage', function () {
    return {
        restrict: 'EA',
        replace: true,
        templateUrl: 'modules/common/directives/promotional-message.html',
        link: function (scope, elem, attrs) {
            //TODO: There might be chance we will have this message from server.
            //So at that time we can write a code here to get that.
        }
    };
});