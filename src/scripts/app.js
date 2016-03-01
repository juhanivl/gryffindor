var myApp = angular.module('myApp',['ngRoute']);


    myApp.controller('myCtrl', function ($scope, $http, ajaxService) {

        $scope.showModalReg = false;
        $scope.showModalLogin = false;
        $scope.showModalUpload = false;
        $scope.showModalImageView = false;
        $scope.showModalSettings = false;
        $scope.showModalEdit = false;
        $scope.showModalAccount = false;

        $scope.toggleModalReg = function () {
            $scope.showModalReg = !$scope.showModalReg;

        };

        $scope.toggleModalLogin = function () {
            $scope.showModalLogin = !$scope.showModalLogin;

        };


        $scope.toggleModalUpload = function () {
            $scope.showModalUpload = !$scope.showModalUpload;

        };

        $scope.toggleModalAccount = function () {
            $scope.showModalAccount = !$scope.showModalAccount;

        };
    
        $scope.toggleModalEdit = function () {
            $scope.showModalEdit = !$scope.showModalEdit;
        };

        $scope.toggleModalSettings = function () {
            $scope.showModalSettings = !$scope.showModalSettings;
        };

        $scope.toggleModalImageView = function () {
            $scope.showModalImageView = !$scope.showModalImageView;
        };

        $scope.toggleAllModals = function () {
            if ($scope.showModalReg || $scope.showModalLogin === true || $scope.showModalUpload === true || $scope.showModalSettings === true || $scope.showModalEdit === true || $scope.showModalAccount === true) {
                $scope.showModalLogin = false;
                $scope.showModalReg = false;
                $scope.showModalUpload = false;
                $scope.showModalSettings = false;
                $scope.showModalEdit = false;
                $scope.showModalAccount = false;
            }
        };

        //if logged
        $scope.logged = false;
        if (localStorage.getItem('userId') === null) {
            $scope.logged = false;
        } else {
            $scope.logged = true;
        }

        $scope.toggleModalLogout = function () {
            
            localStorage.removeItem('userId');
            $scope.logged = false;
            
        };
        
    
          $scope.testi = function () {
          
          var userId = localStorage.getItem('userId');
            console.log(userId);
        
          var request = ajaxService.getUserById(userId);
              request.then(function (response) {
                    console.log(fileId,userId);
                    console.log(response.data);
                },
                function (error) {
                    console.log(error.data);
                });
            };

    });

