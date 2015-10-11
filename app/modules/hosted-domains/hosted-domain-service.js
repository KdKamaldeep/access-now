(function () {
    'use strict';
    angular.module('accessnowapp')
    .factory('domainService', domainService);

    domainService.$inject = ['api', 'apiconfig']
   
    function domainService(api, apiconfig) {
        var service = this;

        service.verifyDomain = function (domain) {
            return api.post(apiconfig.domain.verificationUrl, domain);
        };

        return service;
    }
})();