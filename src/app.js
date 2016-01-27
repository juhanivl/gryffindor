//var app = angular.module('myApp', ['infinite-scroll']);
var myApp = angular.module('myApp', ['infinite-scroll']);
/*app.controller('myCtrl', function ($scope) {

    $scope.firstName = "John";
    $scope.lastName = "Doe";

    $scope.showModal = false;
    $scope.toggleModal = function () {
        $scope.showModal = !$scope.showModal;
    };
    
});*/

myApp.controller('DemoController', function($scope) {
  $scope.images = [1, 2, 3, 4, 5, 6, 7, 8];

  $scope.loadMore = function() {
    var last = $scope.images[$scope.images.length - 1];
    for(var i = 1; i <= 8; i++) {
      $scope.images.push(last + i);
    }
  };
});
