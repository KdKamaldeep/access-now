(function () {
    'use strict';
    angular.module('accessnowapp')
    .factory('cronService', cronService);

    cronService.$inject = ['api', 'apiconfig'];

    function cronService(api, apiconfig) {

        var service = this;

        service.issueCronJobProcess = function () {
            return api.get(apiconfig.domain.cronJobUrl);
        }

        return service;
    }
})();