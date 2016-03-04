angular.module('myApp')
    .controller('SearchController', function ($scope, ajaxService) {
     
    $scope.search = function () {
            
            var data = {
                title: $scope.title
            };

            console.log(data);
            var request = ajaxService.search(data);

            request.then(function (response) {
                console.log(response.data);
                
                if (response.data.status == 'ok') {
                    document.getElementById('search').reset();
                } 
            }, function (error) {
                console.log(error.data);
            });
        };
    });