angular.module('myApp')
    .controller('UploadController', function ($scope, ajaxService) {

    $scope.showSuccess= false;
    $scope.showFail = false;

    
    
        $scope.setMediaFile = function (element) {
            console.log(element);
            $scope.mimeType = element.files[0].type;
            $scope.type = $scope.mimeType.substr(0, 5);
        };

        $scope.uploadMediaFile = function () {
            var userId = localStorage.getItem('userId');
            //check if user is logged in
            if (userId === null) {
                 //FAIL
                 $scope.showFail = !$scope.showFail;
                //alert('Login to upload awsome files');

            } else {
                var fd = new FormData(document.getElementById('uploadForm'));
                fd.append('user', userId);
                fd.append('type', $scope.type);
                fd.append('mime-type', $scope.mimeType);

                var request = ajaxService.uploadFile(fd);

                request.then(function (response) {
                    console.log(response.data);
                    //to close modal
                    //$scope.toggleModalUpload();
                    document.getElementById('uploadForm').reset();
                    
                    //SUCCESS
                     $scope.showSuccess = !$scope.showSuccess;
                    //alert('Successfully!!!');
                    
                    
                    
                }, function (error) {
                    console.log(error.data);
                    //alert(error.data);
                });
            };

        };
    });