angular.module('myApp')
    .factory('ajaxService2', function ($http) {
    
    
    return $http.get('http://util.mw.metropolia.fi/ImageRekt/api/v2/files')
            .success(function (data) {
                return data;
            })
            .error(function (err) {
                return err;
            });
    });