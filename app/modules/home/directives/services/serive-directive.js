angular.module('accessnowapp')
.directive('serviceList', ['ngCart', 'growl', '$routeParams', function (ngCart, growl, $routeParams) {
    return {
        templateUrl: 'modules/home/directives/services/services.html',
        link: function (scope, element, attr) {
            scope.Services = [{ id: 1, name: 'Starter Plan', Image: 'img/icon-63.png', Added: false, price: 100 },
                { id: 2, name: 'Premium Plan', Image: 'img/icon-64.png', Added: false, price: 300 },
                { id: 3, name: 'Advanced Plan', Image: 'img/icon-65.png', Added: false, price: 500 }];

            scope.Circles = scope.Services;//angular.copy(scope.Services);

            scope.itemId = $routeParams.itemid;


            scope.AddToCircles = function (service, index) {
                service.Added = true;
                scope.ShowAddToCartButton();
            };

            scope.ShowAddButton = false;
            scope.ShowCheckOutButton = false;

            scope.ShowAddToCartButton = function () {
                var isShow = false;
                angular.forEach(scope.Services, function (item) {
                    if (item.Added) {
                        isShow = true;
                    }
                });

                scope.ShowAddButton = isShow;
            };

            scope.RemoveCircle = function (circle) {
                circle.Added = false;
                scope.ShowAddToCartButton();
            }

            scope.AddToCard = function () {
                angular.forEach(scope.Services, function (item) {
                    var cartItems = ngCart.getItems();
                    //var cartItem = ngCart.getItemById(parseInt(scope.itemId));
                    angular.forEach(cartItems, function (cItem) {
                        cItem.setHosting({
                            name: item.name,
                            price: item.price
                        });
                        cItem.NoHosting = false;
                        ngCart.ErrorMessage = "";
                    });
                    //if (cartItem != null && cartItem !== undefined) {
                    //    if (item.Added) {
                    //        cartItem.setHosting({
                    //            name: item.name,
                    //            price: item.price
                    //        });
                    //        cartItem.NoHosting = false;
                    //        ngCart.ErrorMessage = "";
                    //    }
                    //}
                    
                })
                growl.success('Bundle has been added to the cart.');
                scope.ShowCheckOutButton = true;
            }
        }
    };
}]);