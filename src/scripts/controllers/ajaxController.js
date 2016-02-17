angular.module('myApp')
    .controller('AjaxCtrl', function ($scope, ajaxService2, $sce) {
        ajaxService2.success(function (data){ 
           
            angular.forEach(data,function(item){
                item.path = "http://util.mw.metropolia.fi/uploads/" + item.path;
            });
            
            $scope.files = data;
        });
    
    $scope.showModalImageView = false;
        $scope.toggleModalImageView = function(path,title,type){
        $scope.path = path;
        $scope.title = title;
        $scope.type = type;
        $scope.showModalImageView = !$scope.showModalImageView;
            
    };
    
    $scope.getMediaUrl = function(url) {
        return $sce.trustAsResourceUrl(url);
    };

    });

