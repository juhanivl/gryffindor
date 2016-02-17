angular.module('myApp')
    .factory('commentService', function ($http, $httpParamSerializer) {
    
    
    ajaxFunctions.comment = function (data,formData) {
      
    var commentInfo = {
        method: "POST",
        url:
        "http://util.mw.metropolia.fi/ImageRekt/api/v2/comment/file"+data,
        data: $httpParamSerializer(formData),
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    };
        
    return $http(commentInfo);
    
  
    });