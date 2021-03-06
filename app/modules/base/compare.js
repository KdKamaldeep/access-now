﻿(function () {
    'use strict';
    angular.module('accessnowapp')
        .directive("passwordVerify", function () {
        return {
            require:"ngModel",
            link: function(scope,element,attrs,ctrl){
                ctrl.$parsers.unshift(function(viewValue){
                    var origin = scope.$eval(attrs["passwordVerify"]);
                    if(origin!==viewValue){
                        ctrl.$setValidity("passwordVerify",false);
                        return undefined;
                    }else{
                        ctrl.$setValidity("passwordVerify",true);
                        return viewValue;
                    }
                });

            }
        };
    });   

})();