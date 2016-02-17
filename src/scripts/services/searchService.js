angular.module('myApp')
    .factory('searchService', function ($http, $httpParamSerializer) {
    
    var urlBase = 'http://util.mw.metropolia.fi/ImageRekt/api/v2/';
    var ajaxFunctions = {};
    
    ajaxFunctions.search = function (args) {
        return $http.post(urlBase + 'search', $httpParamSerializer(args), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    };
        
    return ajaxFunctions;
    

    });