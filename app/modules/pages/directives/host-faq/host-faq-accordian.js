angular.module('accessnowapp')
.directive('hostAccordian', function () {
    return {
        templateUrl: 'modules/pages/directives/host-faq/host-faq-accodian.html',
        link: function () {

            //See in slider-init.js under common module
            initAccordian();

        }
    };
});