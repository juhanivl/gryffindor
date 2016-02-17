angular.module('myApp')
    .controller('CommentController', function ($scope, commentService) {
       
    $scope.user = localStorage.getItem("user");
    $scope.comment = "";
    
    $scope.addComment = function () {
        $scope.newComment = {
            "user": localStorage.getItem("user"),
            "comment": $scope.comment
        };
        localStorage.getItem("user");
        
    }
    
    
    });