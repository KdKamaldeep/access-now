angular.module('accessnowapp')
.directive('angSwiper', ['$timeout', function ($timeout) {
    return {
        restrict: 'EA',
        replace: true,
        template: '<div ng-include="GetTempUrl()" />',
        link: function (scope, elem, attrs) {

            scope.GetTempUrl = function () {
                return attrs.templatepath;
            };

            $timeout(function () {
                //See inslider init js under common module
                initSwiper($(elem).find('.swiper-container'));
            }, 1000);
        }
    };
}]);