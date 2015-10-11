(function () {
    'use strict';

    angular.module('accessnowapp')

    .provider('apiconfig', ['apibase', 'apibasewhmcs', function (apibase, apibasewhmcs) {

        this.$get = function () {
            var apiConfig = {
                whmcs: {
                    createClientUrl: apibasewhmcs + "/whmcs/addClient",
                    getClientUrl: apibasewhmcs + "/whmcs/getClientsDetails",
                    addOrderUrl: apibasewhmcs + "/whmcs/registerOrderBundle"
                },
                user: {
                    loginUrl: apibase + "/user/login",
                    signUpUrl: apibase + "/user/create",
                    logoutUrl: apibase + "/user/logout",
                    getUserUrl: apibase + '/user/info'
                },
                domain: {
                    verificationUrl: apibase + "/domain/verification",
                    createDomainUrl: apibase + "/payment/domainprocess_v2",
                    getDomainInfoUrl: apibase + "/domain/info",
                    cronJobUrl: apibase + "/cron/queueprocess",
                    nameServersUrl: apibase + "/domain/nameservers",
                    renewDomainUrl: apibase + "/payment/renew"
                },
                domainprice: {
                    createDomainpriceUrl: apibase + "/adminarea/configuration/domainprice/add",
                    editDomainpriceUrl: apibase + "/adminarea/configuration/domainprice/edit",
                    deleteDomainpriceUrl: apibase + "/adminarea/configuration/domainprice/delete",
                    listDomainpriceUrl: apibase + "/adminarea/configuration/domainprice/list",
                },
                getLocalBaseAddress: function () {
                    var protocal = window.location.protocol;
                    var host = window.location.hostname;
                    var port = window.location.port;
                    var url = protocal + '//' + host;
                    if (host.indexOf('localhost') >= 0)
                        url += ":" + port;

                    return url;
                },
                countriesUrl: function () {
                    var url = apiConfig.getLocalBaseAddress();
                    return url + '/data/countries.json';
                }
            };

            return apiConfig;
        }
    }])
    .constant('apibase', 'https://accessnowapi.herokuapp.com/api')
    .constant('apibasewhmcs', 'https://accesswhmcs.herokuapp.com/api');

})();