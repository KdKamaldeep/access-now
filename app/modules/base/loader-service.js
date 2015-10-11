(function () {
    'use strict';
    angular.module('accessnowapp')
    .factory('loaderService', loaderService);

    loaderService.$inject = []

    function loaderService() {
        var service = this;

        service.blockElement = function (elem)
        {
            $(elem).block({
                message: '<img src="img/ajax-loader.gif" />',
                css: {
                    border: 'none',
                    backgroundColor: '#000',
                    '-webkit-border-radius': '10px',
                    '-moz-border-radius': '10px',
                    opacity: .5,
                    color: '#fff'
                }
            });
        };

        
        return service;
    }
})();
