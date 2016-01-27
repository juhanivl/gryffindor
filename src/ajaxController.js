angular.module('myApp')
    .controller('AjaxCtrl', function ($scope, ajaxService) {
        ajaxService.success(function (data) {
            $scope.files = data;
        });
    });