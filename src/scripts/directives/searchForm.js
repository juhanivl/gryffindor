angular.module('myApp')
    .directive('searchForm', function () {
        return {
            replace: true,
            restrict: 'E',
            templateUrl: 'views/searchForm.html'
        };
    });