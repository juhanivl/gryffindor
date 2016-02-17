angular.module('myApp')
    .factory('ajaxService', function ($http, $httpParamSerializer) {
    
    var urlBase = 'http://util.mw.metropolia.fi/ImageRekt/api/v2/';
    var ajaxFunctions = {};
    
    ajaxFunctions.register = function (args) {
        return $http.post(urlBase + 'register', $httpParamSerializer(args), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    };
    
    ajaxFunctions.login = function (args) {
        return $http.post(urlBase + 'login', $httpParamSerializer(args), {
                 headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    };
        
    return ajaxFunctions;
    
    /*return $http.get('http://util.mw.metropolia.fi/ImageRekt/api/v2/files')
            .success(function (data) {
                return data;
            })
            .error(function (err) {
                return err;
            });*/
    });