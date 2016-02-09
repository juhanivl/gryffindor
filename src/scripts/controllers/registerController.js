angular.module('myApp')
    .controller('RegisterController', function ($scope, ajaxService) {

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
                    alert('Register successfully!!!');
                } else {
                    alert('Username already exists');
                }
            }, function (error) {
                console.log(error.data);
            });
        };
    });