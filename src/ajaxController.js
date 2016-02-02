angular.module('myApp')
    .controller('AjaxCtrl', function ($scope, ajaxService) {
        ajaxService.success(function (data) {
            $scope.files = data;
        });
    
    $scope.showModalImageView = false;
        $scope.toggleModalImageView = function(){
        $scope.showModalImageView = !$scope.showModalImageView;
            
    };
  
    });

