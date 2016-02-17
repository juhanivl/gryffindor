angular.module('myApp')
    .controller('AjaxCtrl2', function ($scope, ajaxService3) {
        ajaxService3.success(function (data){ 
            $scope.files = data;
        });
    
    
    });