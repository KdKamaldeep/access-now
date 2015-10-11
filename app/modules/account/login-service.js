(function () {
    'use strict';
    angular.module('accessnowapp')
    .factory('loginService', loginService);

    loginService.$inject = ['api', 'apiconfig', '$cookies', '$rootScope', '$http', 'storageService']

    function loginService(api, apiconfig, $cookies, $rootScope, $http, storageService) {
        var service = this;

        service.login = function (loginModel) {
            return api.post(apiconfig.user.loginUrl, loginModel);
        };

        service.logout = function (token) {
            return api.post(apiconfig.user.logoutUrl, { token: token });
        };

        service.signUp = function (signupModel) {
            return api.post(apiconfig.user.signUpUrl, signupModel);
        };

        service.getUser = function (token) {
            return api.post(apiconfig.user.getUserUrl, { token: token });
        };

        service.getCurrentUserAccesToken = function () {
            $rootScope.globals = $cookies.getObject('globals') || {};
            if ($rootScope.globals.currentUser)
                return $rootScope.globals.currentUser.token;

            return "";
        },

        service.setCredentials = function (userModel) {
            if (userModel != null && userModel !== undefined) {
                $rootScope.globals = {
                    currentUser: userModel
                };

                $rootScope.SafeApplly(function () {
                    $rootScope.UserName = userModel.fullname;
                });
                $rootScope.Auth = true;
                $http.defaults.headers.common['Authorization'] = userModel.access_token; // jshint ignore:line
                $cookies.putObject('globals', $rootScope.globals);
            }
        };

        service.clearCredentials = function () {
            $rootScope.globals = {};
            $cookies.remove('globals');
            $rootScope.SafeApplly(function () {
                $rootScope.Auth = false;
                $rootScope.UserName = "";
            });
            storageService.clearAll();
            $http.defaults.headers.common.Authorization = 'Basic ';
        };

        return service;

    }
})();
