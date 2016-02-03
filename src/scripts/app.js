var myApp = angular.module('myApp', []);
myApp.controller('myCtrl', function ($scope) {

    $scope.firstName = "John";
    $scope.lastName = "Doe";

    $scope.showModalReg = false;
    $scope.showModalLogin = false;
    $scope.showModalUpload  = false;
    $scope.showModalImageView = false;
    
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
    

    $scope.user = {
            username: '',
            title: '',
            description: '',
            type: ''
        };
    
    $scope.register = function() {
           console.log('User clicked register', $scope.user);
        };
    
           /* $scope.setImageFile = function (element) {
            // Get the image data from element
            //Start to put the file into canvas element
            $scope.init();
            var reader = new FileReader();
            reader.onload = function (e) {
                $scope.image.src = e.target.result;
            };
            reader.readAsDataURL(element.files[0]);
            $scope.image.onload = $scope.resetImage;
        };
    $scope.init = function () {
            
    
            $scope.canvas = angular.element('#myCanvas')[0];
            $scope.ctx = $scope.canvas.getContext('2d');
            $scope.image = new Image();
           
        };

        $scope.init();
    
     $scope.resetImage = function () {

            // When image data is loaded (after onload)
            // Put the data into canvas element
            $scope.ctx.drawImage($scope.image, 0, 0,                $scope.canvas.width = $scope.image.width, $scope.canvas.height =    $scope.image.height);
             
            // read pixel data
      $scope.imageData = $scope.ctx.getImageData(0, 0,              $scope.canvas.width, $scope.canvas.height);
      $scope.pixels = $scope.imageData.data;
      $scope.numPixels = $scope.imageData.width * $scope.imageData.height;
     };
*/
             
});

myApp.controller('ImageController', function($scope) {
  
    $scope.images = [1, 2, 3, 4, 5, 6, 7, 8]; 

  $scope.loadMore = function() {
    var last = $scope.images[$scope.images.length - 1];
    for(var i = 1; i <= 8; i++) {
      $scope.images.push(last + i);
    }
  };
    

 });
    
