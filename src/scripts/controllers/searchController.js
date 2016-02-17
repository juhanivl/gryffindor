angular.module('myApp')
    .controller('SearchController', function ($scope, searchService) {

        $scope.search = function () {
            
            var data = {
                title: $scope.title
            };

            var request = ajaxService.search(data);

            request.then(function (response) {
                console.log(response.data);
                
               
    });