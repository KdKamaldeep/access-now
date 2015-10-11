angular.module('accessnowapp', ['ngRoute', 'angular-growl', 'ngCookies', 'ngStorage', 'ngBusy',
    'angularPayments', 'ngCart', 'internationalPhoneNumber', 'ui.bootstrap'])

.config(['$routeProvider', 'growlProvider', '$httpProvider', function ($routeProvider, growlProvider, $httpProvider) {

    //set close timeout for growl notification.
    growlProvider.globalTimeToLive(10000);
    $httpProvider.interceptors.push('requestInterceptor');

    $routeProvider

    .when('/login', {
        templateUrl: 'modules/account/login-register.html',
        controller: 'login-controller'
    })
        .when('/logout', {
            templateUrl: 'modules/account/login-register.html',
            controller: 'login-controller'
        })

    .when('/hosted-domains', {
        templateUrl: 'modules/hosted-domains/hosted-domain.html',
        controller: 'hosted-domain-controller'
    })
    .when('/contact-us', {
        templateUrl: 'modules/contact-us/contact-us.html',
        controller: 'contact-us-controller'
    })
    .when('/hosting', {
        templateUrl: 'modules/hosting/views/hosting.html',
        controller: 'hosting-controller'
    })
    .when('/shared-hosting', {
        templateUrl: 'modules/hosting/views/shared.html',
        controller: 'shared-controller'
    })
    .when('/vps-hosting', {
        templateUrl: 'modules/hosting/views/host-vps.html',
        controller: 'vps-controller'
    })
    .when('/dedicated-hosting', {
        templateUrl: 'modules/hosting/views/dedicated-hosting.html',
        controller: 'dedicated-controller'
    })
    .when('/host-about', {
        templateUrl: 'modules/pages/views/host-about.html',
        controller: 'host-about-controller'
    })
    .when('/host-faq', {
        templateUrl: 'modules/pages/views/host-faq.html',
        controller: 'host-faq-controller'
    })
    .when('/host-testimonial', {
        templateUrl: 'modules/pages/views/testimonial.html',
        controller: 'host-testimonial-controller'
    })
    .when('/host-data-center', {
        templateUrl: 'modules/pages/views/host-data-centers.html',
        controller: 'host-data-controller'
    })
    .when('/host-support', {
        templateUrl: 'modules/pages/views/support.html',
        controller: 'support-controller'
    })
    .when('/blog', {
        templateUrl: 'modules/blog/views/blog.html',
        controller: 'blog-controller'
    })
    .when('/blog-detail', {
        templateUrl: 'modules/blog/views/blog-detail.html',
        controller: 'blog-detail-controller'
    })
    .when('/checkout', {
        templateUrl: 'modules/checkout/checkout.html',
        controller: 'checkout-controller',
        AuthRequired: true
    })
    .when('/registration', {
        templateUrl: 'modules/account/registration.html',
        controller: 'login-controller'
    })
        .when('/payment-info', {
            templateUrl: 'modules/payment/payment-info.html',
            controller: 'payment-controller',
            AuthRequired: true
        })
     .when('/thankyou', {
         templateUrl: 'modules/payment/thankyou.html',
         controller: 'thankyou-controller',
         AuthRequired: true
     })
    .when('/admin/domainprice', {
        templateUrl: 'modules/admin/domain-price/views/list.html',
        controller: 'domain-price-controller',
        AuthRequired: true
    })
    .when('/admin/domainprice/edit', {
        templateUrl: 'modules/admin/domain-price/views/create.html',
        controller: 'domain-price-controller',
        AuthRequired: true
    })
    .when('/admin/domainprice/create', {
        templateUrl: 'modules/admin/domain-price/views/create.html',
        controller: 'domain-price-controller',
        AuthRequired: true
    })
        .when('/admin/domainprice/create/:id', {
            templateUrl: 'modules/admin/domain-price/views/create.html',
            controller: 'domain-price-controller',
            AuthRequired: true
        })
        .when('/cart', {
            templateUrl: 'modules/cart/cart.html',
            controller: 'cart-controller'            
        })
        .when('/:itemid', {
            templateUrl: 'modules/home/main.html',
            controller: 'main-controller'
        }).when('/', {
            templateUrl: 'modules/home/main.html',
            controller: 'main-controller'
        });;
}])

.run(['$rootScope', 'loginService', '$location', '$cookies', 'cronService', '$interval', 'ngCart',
    function ($rootScope, loginService, $location, $cookies, cronService, $interval, ngCart) {

        Stripe.setPublishableKey('pk_test_L38uK4IiV0qE7LDo49jkOPrZ');

        ngCart.setTaxRate(2.9);

        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            if (next !== undefined) {
                if (next.AuthRequired != undefined && next.AuthRequired == true) {
                    if (loginService.getCurrentUserAccesToken() === '') {
                        var returnUrl = $location.url();
                        $location.path('login').search({ returnUrl: returnUrl });
                    }
                }
            }
        });

        //$rootScope.UpdateDomain = function () {
        //    $interval(function () {
        //        cronService.issueCronJobProcess();
        //    }, 1000 * 60);
        //};

        //It will start issue a cron job request after every one minute.
        //$rootScope.UpdateDomain();

        $rootScope.SafeApplly = function (callback) {
            if (!$rootScope.$$phase) {
                $rootScope.$apply(callback);
            }
            else {
                callback();
            }
        };

        $rootScope.$on('$routeChangeSuccess', function () {
            $('body, html').animate({ 'scrollTop': '0' }, 2);
            $('body').addClass('loaded');
        });

        //This one we are using to hide/show header message on header bar.
        //Just call $rootScope.ShowContainerOverHeader(true) to show message in any controller
        //and if you want to hide this message after we change a route then $on to destroy method
        //and call $rootScope.ShowContainerOverHeader(false);
        $rootScope.ShowHeaderMessage = false;
        $rootScope.ShowContainerOverHeader = function (show) {
            $rootScope.ShowHeaderMessage = show;
        };

        $rootScope.globals = $cookies.getObject('globals') || {};

        if ($rootScope.globals.currentUser) {
            loginService.setCredentials($rootScope.globals.currentUser);
            if ($.inArray($location.path(), ['/login', '/registration', '/logout']) !== -1)
                $location.path("/");
        }
        //else {
        //    $location.path("login");
        //}

        $rootScope.Logout = function () {
            loginService.logout(loginService.getCurrentUserAccesToken())
            .then(function (response) {
                if (response.status) {
                    loginService.clearCredentials();
                    $location.path("/");
                }
                else {
                    loginService.clearCredentials();
                    $location.path("/");
                }

            }, function (error) {

            });
        };

    }]);

angular.element(document).ready(function () {
    angular.bootstrap(document, ["accessnowapp"]);
});