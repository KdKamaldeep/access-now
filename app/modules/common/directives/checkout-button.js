angular.module('accessnowapp')
.directive('checkoutButton', ['storageService', 'loginService', '$location', 'ngCart',
    function (storageService, loginService, $location, ngCart) {
        return {
            restrict: 'EA',
            replace: false,
            template: '<a href="javascript:" class="button" ng-click="clickHandler()">{{buttonText}}</a>',
            scope: {
                hosting: '@',
                price: '@'
            },
            link: function (scope, elem, attrs) {
                scope.buttonText = "Get Started";
                if (angular.isDefined(attrs.buttontext)) {
                    scope.buttonText = attrs.buttontext;
                }

                scope.clickHandler = function () {
                    //scope.name = angular.isDefined(attrs.hosting) ? attrs.hosting : "";
                    //scope.price = angular.isDefined(attrs.price) ? attrs.price : "";
                    var price = parseInt(scope.price) * 12;
                    var items = ngCart.getItems();
                    angular.forEach(items, function (item) {
                        item.setHosting({ name: scope.hosting, price: price });
                        item.NoHosting = false;
                        ngCart.ErrorMessage = "";
                    });
                    ngCart.ErrorMessage = "";
                    $location.path('cart');
                }
            }
        };
    }]);