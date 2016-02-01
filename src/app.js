var myApp = angular.module('myApp', ['infinite-scroll']);
myApp.controller('myCtrl', function ($scope) {

    $scope.firstName = "John";
    $scope.lastName = "Doe";

    $scope.showModalReg = false;
    $scope.showModalLogin = false;
    $scope.showModalUpload  = false;
    
    
    $scope.toggleModalReg = function () {
        $scope.showModalReg = !$scope.showModalReg;
        
    };
    
     $scope.toggleModalLogin = function () {
        $scope.showModalLogin = !$scope.showModalLogin;
        
    };
    
    $scope.toggleAllModals = function () {
        if ($scope.showModalReg || $scope.showModalLogin === true || $scope.showModalUpload === true) {
            $scope.showModalLogin = false;
            $scope.showModalReg = false;
            $scope.showModalUpload = false;
        }
    };
    
     $scope.toggleModalUpload = function () {
        $scope.showModalUpload  = !$scope.showModalUpload ;
        
    };
    
            $scope.setImageFile = function (element) {
            // Get the image data from element
            //Start to put the file into canvas element
            var reader = new FileReader();
            reader.onload = function (e) {
                $scope.image.src = e.target.result;
            };
            reader.readAsDataURL(element.files[0]);
            $scope.image.onload = $scope.resetImage;
        };
             
});

myApp.controller('ImageController', function($scope) {
  
    $scope.images = [1, 2, 3, 4, 5, 6, 7, 8]; 

  $scope.loadMore = function() {
    var last = $scope.images[$scope.images.length - 1];
    for(var i = 1; i <= 8; i++) {
      $scope.images.push(last + i);
    }
  };
    
    $scope.title = "Hey this is funny picture"; // Here will be code fetching images title
    
    $scope.rating = "Rating 4.5/5"; // Here will be code fetching images rating
});
