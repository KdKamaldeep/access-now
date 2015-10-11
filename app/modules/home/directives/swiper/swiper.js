angular.module('accessnowapp')
.directive('swiper', function () {
    return {
        templateUrl: 'modules/home/directives/swiper/swiper.html',
        link: function () {

            //See inslider init js under common module
            initSwiper();

        }
    };
});