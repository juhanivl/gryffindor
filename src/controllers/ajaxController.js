angular.module('myApp')
    .controller('AjaxCtrl', function ($scope, ajaxService) {
        ajaxService.success(function (data) {
            $scope.files = data;
        });
    
    $scope.showModalImageView = false;
        $scope.toggleModalImageView = function(path,title){
        $scope.path ="http://util.mw.metropolia.fi/uploads/" + path;
        $scope.title = title;
        $scope.showModalImageView = !$scope.showModalImageView;
            
    };

    });

