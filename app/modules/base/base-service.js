(function () {

    angular.module('accessnowapp')

    .factory('api', baseService);

    baseService.$inject = ['$http', '$q', 'apiconfig'];

    function baseService($http, $q, apiconfig) {

        var service = this;

        service.get = function (url) {

            var defer = $q.defer();

            $http.get(url)
              .success(function (result) {
                  defer.resolve(result);
              })
            .error(function (err) {
                defer.reject(err);
            });

            return defer.promise;
        };

        service.delete = function (url) {
            var defer = $q.defer();

            $http.delete(url)
              .success(function (msg) {
                  defer.resolve(msg);
              })
            .error(function (err) {
                defer.reject(err);
            });

            return defer.promise;
        };

        service.post = function (url, data) {

            var defer = $q.defer();

            $http.post(url, data)
              .success(function (result) {
                  defer.resolve(result);
              })
            .error(function (err) {
                defer.reject(err);
            });

            return defer.promise;
        };

        service.put = function (url, data) {

            var defer = $q.defer();

            $http.post(url, data)
            .success(function (result) {
                defer.resolve(result);
            })
            .error(function (err) {
                defer.reject(err);
            });

            return defer.promise;
        };

        service.getCountries = function () {
            var url = apiconfig.countriesUrl();
            return service.get(url);
        };

        return service;
    }
})();


