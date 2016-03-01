angular.module('myApp')
    .controller('SearchController', function ($scope, ajaxService) {
     
    $scope.search = function () {
            
            var data = {
                title: $scope.title
            };

            var request = ajaxService.search(data);

            request.then(function (response) {
                console.log(response.data);
                
                if (response.data.status == 'ok') {
                    document.getElementById('searchForm').reset();
                } else {
                    alert('Title not found');
                }
            }, function (error) {
                console.log(error.data);
            });
        };
    });