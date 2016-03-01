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

        ajaxFunctions.uploadFile = function (args) {
            return $http.post(urlBase + 'upload', args, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            });
        };

        ajaxFunctions.getComments = function (args) {
            console.log(args);
            return $http.get('http://util.mw.metropolia.fi/ImageRekt/api/v2/comments/file/' + args);
        };

        ajaxFunctions.addComment = function (args, id) {
            return $http.post(urlBase + 'comment/file/' + id, $httpParamSerializer(args), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        };


        ajaxFunctions.getUserById = function (args) {
            return $http.get('http://util.mw.metropolia.fi/ImageRekt/api/v2/user/' + args);
        };

        ajaxFunctions.search = function (args) {
        console.log(args);
        return $http.post(urlBase + 'files/search/', $httpParamSerializer(args), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });
    };
    
    ajaxFunctions.likeFile = function (fileId,userId) {
            return $http.get('http://util.mw.metropolia.fi/ImageRekt/api/v2/like/'+ fileId + "/" + userId);
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