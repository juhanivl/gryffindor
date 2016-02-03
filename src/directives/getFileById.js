angular.module('myApp')
.directive('getUrl',function(){

return {
    restrict: 'A',
    scope: {
      url: '@'
    },
    controller: function($scope){
        console.log($scope.url);
    }
};

});