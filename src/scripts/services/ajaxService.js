angular.module('myApp')
    .factory('ajaxService', function ($http, $httpParamSerializer) {

        var urlBase = 'http://util.mw.metropolia.fi/ImageRekt/api/v2/';
        var ajaxFunctions = {};

        //Register service    
    
        ajaxFunctions.register = function (args) {
            return $http.post(urlBase + 'register', $httpParamSerializer(args), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        };

        //Login service
    
        ajaxFunctions.login = function (args) {
            return $http.post(urlBase + 'login', $httpParamSerializer(args), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        };

        //Upload a file service    
    
        ajaxFunctions.uploadFile = function (args) {
            return $http.post(urlBase + 'upload', args, {
                transformRequest: angular.identity,
                headers: {
                    'Content-Type': undefined
                }
            });
        };

        //Get comments service
    
        ajaxFunctions.getComments = function (args) {
            console.log(args);
            return $http.get('http://util.mw.metropolia.fi/ImageRekt/api/v2/comments/file/' + args);
        };
    
        //Add comments service

        ajaxFunctions.addComment = function (args, id) {
            return $http.post(urlBase + 'comment/file/' + id, $httpParamSerializer(args), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        };

        //Get description service
    
        ajaxFunctions.getDescription = function (args) {
            console.log(args);
            return $http.get('http://util.mw.metropolia.fi/ImageRekt/api/v2/file/' + args);
        };


        //Get user by id service
    
        ajaxFunctions.getUserById = function (args) {
            return $http.get('http://util.mw.metropolia.fi/ImageRekt/api/v2/user/' + args);
        };

        //Search service
    
        ajaxFunctions.search = function (args) {
            console.log(args);
            return $http.post("http://util.mw.metropolia.fi/ImageRekt/api/v2/files/search/title/", $httpParamSerializer(args), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
        };

        //Check user likes service
    
        ajaxFunctions.checkUserLikes = function (userId) {
            return $http.get(urlBase + "likes/user/" + userId);
        };

        //Like a file service
    
        ajaxFunctions.likeFile = function (fileId, userId) {
            return $http.get('http://util.mw.metropolia.fi/ImageRekt/api/v2/like/' + fileId + "/" + userId);
        };

        //Unlike a file service
    
        ajaxFunctions.unlikeFile = function (fileId, userId) {
            return $http.get('http://util.mw.metropolia.fi/ImageRekt/api/v2/unlike/' + fileId + "/" + userId);
        };
    
        //Getting files by user service

        ajaxFunctions.getFilesByUser = function (userId) {
            return $http.get(urlBase + 'files/user/' + userId);
        };
    
    
        //Get files service
       
        ajaxFunctions.getFiles = function() {
            return $http.get('http://util.mw.metropolia.fi/ImageRekt/api/v2/files');
        };
        
        return ajaxFunctions;


    });