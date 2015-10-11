angular.module('accessnowapp')
.directive('angcheckbox', function () {
    return {
        restrict: 'EA',
        link: function (scope, elem, attrs) {
            /*==================================================*/
            /* 09 - form elements - checkboxes and radiobuttons */
            /*==================================================*/
            $('.checkbox-entry.checkbox label').click(function () {
                $(this).parent().toggleClass('active');
                $(this).parent().find('input').click();
            });

            $('.checkbox-entry.radio label').click(function () {
                $(this).parent().find('input').click();
                if (!$(this).parent().hasClass('active')) {
                    var nameVar = $(this).parent().find('input').attr('name');
                    $('.checkbox-entry.radio input[name="' + nameVar + '"]').parent().removeClass('active');
                    $(this).parent().addClass('active');
                }
            });
        }
    };
});