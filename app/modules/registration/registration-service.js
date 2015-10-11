(function () {
    'use strict';
    angular.module('accessnowapp')
    .factory('RegistrationService', RegistrationService);

    RegistrationService.$inject = ['api', 'apiconfig'];

    function RegistrationService(api, apiconfig) {
        var service = this;

       
        service.register = function (RegisterModel) {
            return api.post(apiconfig.registerUrl, registerModel);
        }

        return service;
    }
})();
