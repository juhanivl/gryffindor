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
                    
                    //hide login button
                    document.getElementById('login-navbar').style.display = 'none';
                    console.log('login button is hide');
                    
                    //show log out and account button
                    document.getElementById('account-navbar').style.display = '';
                    document.getElementById('logout-navbar').style.display = '';
                    console.log('show log out and account button')
                    
                    //save user name to localStorage        
                    localStorage.setItem('userId', response.data.userId);                    
                    localStorage.setItem('logged', 'true');
                    console.log(localStorage.userId);
                    console.log(localStorage.logged);
                    
                } else {
                    alert('Wrong username or password');
                }

            }, function (error) {
                console.log(error);
            });
        };


    });