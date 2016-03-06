angular.module('myApp')
    .controller('UploadController', function ($scope, ajaxService) {

    $scope.showSuccess= false;
    $scope.showFail = false;

        //Sets the media file
    
        $scope.setMediaFile = function (element) {
            console.log(element);
            $scope.mimeType = element.files[0].type;
            $scope.type = $scope.mimeType.substr(0, 5);
        };

        //Uploads the media file
    
        $scope.uploadMediaFile = function () {
            var userId = localStorage.getItem('userId');
            //check if user is logged in
            if (userId === null) {
                 //FAIL
                 $scope.showFail = !$scope.showFail;
               

            } else {
                var fd = new FormData(document.getElementById('uploadForm'));
                fd.append('user', userId);
                fd.append('type', $scope.type);
                fd.append('mime-type', $scope.mimeType);

                var request = ajaxService.uploadFile(fd);

                request.then(function (response) {
                    console.log(response.data);
                    document.getElementById('uploadForm').reset();
                    
                    //SUCCESS
                     $scope.showSuccess = !$scope.showSuccess;
                  
                    
                    
                    
                }, function (error) {
                    console.log(error.data);
               
                });
            };

        };
    });