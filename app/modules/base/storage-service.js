(function () {
    'use strict';
    angular.module('accessnowapp')
    .factory('storageService', storageService);

    storageService.$inject = ['$localStorage'];

    function storageService($localStorage) {
        var service = this;

        service.setCurrentDomainToBuy = function (domain) {
            $localStorage.CurrentDomain = domain;
        };

        service.getCurrentDomainToBuy = function (domain) {
            return $localStorage.CurrentDomain;
        };

        service.setCurrentBillingAndPersonalInfo = function (info) {
            $localStorage.CurrentBillingAndPersonalInfo = info;
        };
        service.getCurrentBillingAndPersonalInfo = function (info) {
            return $localStorage.CurrentBillingAndPersonalInfo;
        };

        service.clearAll = function () {
            $localStorage.CurrentDomain = null;
            $localStorage.CurrentBillingAndPersonalInfo = null;
            $localStorage.checkoutInProgress = false;
        };

        service.startCheckout = function () {
            $localStorage.checkoutInProgress = true;
        };

        service.checkoutInProgress = function () {
            return $localStorage.checkoutInProgress;
        };


        return service;
    }
})();
