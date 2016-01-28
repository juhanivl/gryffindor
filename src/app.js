var myApp = angular.module('myApp', ['infinite-scroll']);
/*app.controller('myCtrl', function ($scope) {

    $scope.firstName = "John";
    $scope.lastName = "Doe";

    $scope.showModal = false;
    $scope.toggleModal = function () {
        $scope.showModal = !$scope.showModal;
    };
    
});*/

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
