(function () {
    'use strict';
    angular.module('accessnowapp')
    .factory('paymentService', paymentService);

    paymentService.$inject = ['api', 'apiconfig'];

    function paymentService(api, apiconfig) {
        var service = this;

        service.RegisterDomain = function (domainModel) {
            return api.post(apiconfig.domain.createDomainUrl, domainModel);
        }

        //These will be just for client admin portal.
        service.nameserver = function (domain) {
            return api.post(apiconfig.domain.nameServersUrl, domain);
        }

        //These will be just for client admin portal.
        service.renewDomain = function (domain) {
            return api.post(apiconfig.domain.renewDomainUrl);
        }

        service.createClient = function (client) {
            return api.post(apiconfig.whmcs.createClientUrl, client);
        }

        service.getClient = function (clientInfo) {
            return api.post(apiconfig.whmcs.getClientUrl, clientInfo);
        }

        service.addOrder = function (order)
        {
            return api.post(apiconfig.whmcs.addOrderUrl, order);
        }

        return service;
    }
})();
