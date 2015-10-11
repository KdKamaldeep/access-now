(function () {
    'use strict';
    angular.module('accessnowapp')
    .factory('domainpriceService', domainpriceService);

    domainpriceService.$inject = ['api', 'apiconfig']

    function domainpriceService(api, apiconfig) {
        var service = this;

        service.create = function (domainprice) {
            return api.post(apiconfig.domainprice.createDomainpriceUrl, domainprice);
        };
        service.edit = function (domainprice) {
            return api.post(apiconfig.domainprice.editDomainpriceUrl, domainprice);
        };
        service.delete = function (domainprice) {
            return api.post(apiconfig.domainprice.deleteDomainpriceUrl, domainprice);
        };
        service.list = function (domainprice) {            
            return api.post(apiconfig.domainprice.listDomainpriceUrl, domainprice);
        };

        return service;
    }
})();