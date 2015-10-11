angular.module('accessnowapp')
.controller('host-testimonial-controller', ['$scope', '$timeout', function ($scope, $timeout) {

    //TODO: Change it in future to directive once we start implementing 
    //proper JSON requests.
    $timeout(function () {
        initSwiper();   
        initTestimonial();
    }, 1000);

}]);