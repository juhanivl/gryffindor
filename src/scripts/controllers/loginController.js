angular.module('myApp')
    .controller('LoginController', function ($scope, ajaxService) {

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
                    alert('Log in successfully')
    
                    //save user name to localStorage        
                    localStorage.setItem('userId', response.data.userId);            
                    console.log('login with userId: ' + localStorage.userId);
                    
                    
                } else {
                    alert('Wrong username or password');
                }

            }, function (error) {
                console.log(error);
            });
        };


    });