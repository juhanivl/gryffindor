angular.module('myApp')
    .directive('registerForm', function () {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'views/registerForm.html'
        };
    });