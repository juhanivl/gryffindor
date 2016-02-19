angular.module('myApp')
    .controller('AjaxCtrl', function ($scope, ajaxService2, ajaxService, $sce) {
        ajaxService2.success(function (data) {

            angular.forEach(data, function (item) {
                item.path = "http://util.mw.metropolia.fi/uploads/" + item.path;
            });

            $scope.files = data;
        });

        $scope.showModalImageView = false;
        $scope.toggleModalImageView = function (path, title, type, fileId) {
            $scope.path = path;
            $scope.title = title;
            $scope.type = type;
            $scope.fileId = fileId;

            console.log("ennen servicee" + $scope.fileId);

            var request = ajaxService.getComments($scope.fileId);
            request.then(function (response) {
                    $scope.comments = response.data;
                console.log("servicen jälkene: " + $scope.fileId);
                console.log(response);
                
                    
                   
                },
                function (error) {
                    console.log(error.data);
                });
            
            $scope.showModalImageView = !$scope.showModalImageView;
            
        };

        $scope.getMediaUrl = function (url) {
            return $sce.trustAsResourceUrl(url);
        };

    });