angular.module('myApp')
    .controller('AjaxCtrl', function ($scope, ajaxService2, ajaxService, $sce) {

        ajaxService2.success(function (data) {
           /* angular.forEach(data, function (item) {
                item.path = "http://util.mw.metropolia.fi/uploads/" + item.path;
            }); */
            
            $scope.files = data;
        });


        $scope.showCommentView = function (path, title, type, fileId) {
            $scope.path = path;
            $scope.title = title;
            $scope.type = type;
            $scope.fileId = fileId;

            console.log("fileId for comment " + $scope.fileId);

            returnFileId = $scope.fileId;

            getComment($scope.fileId);

            // open the View
            $scope.toggleModalImageView();
        };


        //add Comment function
        $scope.addComment = function () {
            var userId = localStorage.getItem("userId");
            var userName;

            //check if user is logged in
            if (userId === null) {
                alert('Login to comment');
                
            } else {
                var data = {
                    user: userId,
                    comment: $scope.cmt
                };

                //Get user information
                var getUserRequest = ajaxService.getUserById(userId);
                getUserRequest.then(function (response) {
                    console.log(response.data);
                    userName = response.data.username;
                }, function (error) {
                    console.log(error);
                });

                var request = ajaxService.addComment(data, returnFileId);
                console.log('comment to fileId: ' + returnFileId);

                request.then(function (response) {
                    console.log(response.data);

                    if (response.data.status === "comment added") {
                        alert('Comment added');
                        document.getElementById('commentForm').reset();

                        var newComment = {
                            comment: $scope.cmt,
                            username: userName,
                            userId: userId,
                            fileId: returnFileId,
                            time: "Just now"
                        };
                        $scope.comments.push(newComment);
                    }
                }, function (error) {
                    console.log(error);
                });
            }
        };


        //get trusted resources
        $scope.getMediaUrl = function (url) {
            return $sce.trustAsResourceUrl("http://util.mw.metropolia.fi/uploads/"+ url);
        };


        //get comments
        var getComment = function (fileId) {
            var request = ajaxService.getComments(fileId);
            request.then(function (response) {
                    $scope.comments = response.data;
                    console.log("servicen jälkene: " + fileId);
                    console.log(response.data);
                },
                function (error) {
                    console.log(error.data);
                });

        };
    

    $scope.showLikeButton = true;
    $scope.showDislikeButton = false;
    
    
    $scope.likeFile = function (fileId) {
        
        $scope.showLikeButton = !$scope.showLikeButton;
        $scope.showDislikeButton = !$scope.showDislikeButton;
        
        var userId = localStorage.getItem("userId");
        if (userId === null) {
                alert('Login to like');
                
            } else {
        var request = ajaxService.likeFile(fileId,userId);
            request.then(function (response) {
                    console.log(fileId,userId);
                    console.log(response.data);
                },
                function (error) {
                    console.log(error.data);
                });
            }
    };
    
        $scope.unlikeFile = function (fileId) {
        
        $scope.showDislikeButton = !$scope.showDislikeButton;
        $scope.showLikeButton = !$scope.showLikeButton;
        
            
        var userId = localStorage.getItem("userId");
        if (userId === null) {
                alert('Login to unlike');
                
            } else {
        var request = ajaxService.unlikeFile(fileId,userId);
            request.then(function (response) {
                    console.log(fileId,userId);
                    console.log(response.data);
                },
                function (error) {
                    console.log(error.data);
                });
            }
    };
  
        

   
    });