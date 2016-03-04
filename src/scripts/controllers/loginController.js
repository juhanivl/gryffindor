angular.module('myApp')
    .controller('LoginController', function ($scope, ajaxService) {
    
    
    $scope.showSuccess= false;
    $scope.showFail = false;

        $scope.login = function () {

            $scope.toggleModalLogin();

            var data = {
                username: $scope.uname,
                password: $scope.pwd
            };

            var request = ajaxService.login(data);

            request.then(function (response) {
                console.log(response.data);

                if (response.data.status == 'login ok') {
                    //reset form
                    document.getElementById('loginForm').reset();
                    //SUCCESS
                    $scope.showSuccess= !$scope.showSuccess;
    
                    //save user name to localStorage        
                    localStorage.setItem('userId', response.data.userId);            
                    console.log('login with userId: ' + localStorage.userId);
                    
                    
                } else {
                    //FAIL
                    $scope.showFail = !$scope.showFail;

                }

            }, function (error) {
                //FAIL
                    $scope.showFail = !$scope.showFail;
                console.log(error);
            });
        };


    });