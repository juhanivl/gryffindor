angular.module('myApp')
    .directive('registerForm', function () {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'registerForm.html'
        };
    });