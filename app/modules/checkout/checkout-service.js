(function () {
    'use strict';
    angular.module('accessnowapp')
    .factory('checkoutService', checkoutService);

    checkoutService.$inject = ['api', 'apiconfig'];

    function checkoutService(api, apiconfig) {
        var service = this;

        //service.RegisterDomain = function (domainModel) {
        //    return api.post(apiconfig.domain.createDomainUrl, domainModel);
        //}

        ////These will be just for client admin portal.
        //service.nameserver = function (domain) {
        //    return api.post(apiconfig.domain.nameServersUrl, domain);
        //}

        ////These will be just for client admin portal.
        //service.renewDomain = function (domain) {
        //    return api.post(apiconfig.domain.renewDomainUrl)
        //}

        return service;
    }
})();
