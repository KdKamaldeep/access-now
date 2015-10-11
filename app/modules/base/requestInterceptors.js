(function () {

    'use strict';
    angular.module('accessnowapp')
    .factory('requestInterceptor', ['$cookies', function ($cookies) {
        var requestInterceptor = {
            request: function (config) {

                var globals = $cookies.getObject('globals') || {};
                if (globals.currentUser)
                 config.headers['Authorization'] = '' + globals.currentUser.access_token + '"';

                return config;
                //TODO we can manipulate request here before send.
            },
            response: function (response) {
                console.log('Response recieved');
                return response;
                //TODO we can manipulate response here after receiving.
            }
        };

        return requestInterceptor;

    }])

})();