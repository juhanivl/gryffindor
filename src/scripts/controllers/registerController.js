angular.module('myApp')
    .controller('RegisterController', function ($scope, ajaxService) {
    
    
    $scope.showSuccess= false;
    $scope.showFail = false;
    
        //Register

        $scope.register = function () {
            
            var data = {
                username: $scope.uname,
                password: $scope.pwd,
                email: $scope.email
            };

            var request = ajaxService.register(data);

            request.then(function (response) {
                console.log(response.data);
                
                if (response.data.status == 'ok') {
                    document.getElementById('registerForm').reset();
                    //SUCCESS
                    $scope.showSuccess= !$scope.showSuccess;
                    
                } else {
                    //FAIL
                    $scope.showFail = !$scope.showFail;
                }
            }, function (error) {
                //FAIL
                $scope.showFail = !$scope.showFail;
                console.log(error.data);
            });
        };
    });