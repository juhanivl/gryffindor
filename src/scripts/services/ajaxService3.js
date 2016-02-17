angular.module('myApp')
    .factory('ajaxService3', function ($http) {
    
    
    return $http.get('http://util.mw.metropolia.fi/ImageRekt/api/v2/files/type/video')
            .success(function (data) {
                return data;
            })
            .error(function (err) {
                return err;
            });
    });