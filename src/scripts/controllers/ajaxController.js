angular.module('myApp')
    .controller('AjaxCtrl', function ($scope, ajaxService2, ajaxService, $sce) {

        ajaxService2.success(function (data) {
            /* angular.forEach(data, function (item) {
                 item.path = "http://util.mw.metropolia.fi/uploads/" + item.path;
             }); */

            $scope.files = data;



            checkUserLikes();

            //get files by user
            getFilesByUser();
        });

        $scope.filesShow = [];
        $scope.count = 0;
    
        $scope.loadMore = function () {
            var desiredPosts = 10;
            for (var i = $scope.count; i < desiredPosts; i++) {
                $scope.filesShow.push($scope.files[i]);
                console.log('add to filesShow: ' + $scope.files[i]);
            }
            $scope.count += 10;
            console.log('filesShow: ' + $scope.filesShow);
        };

        //
        //        var initializeFilesShow = function () {
        //            for (var i = 0; i < 10; i++) {
        //                $scope.filesShow.push($scope.files[i]);
        //            }
        //        };


        var checkUserLikes = function () {

            var userId = localStorage.getItem("userId");
            if (userId === null) {
                console.log("not logged in");

            } else {
                var request = ajaxService.checkUserLikes(userId);

                request.then(function (response) {
                    $scope.filesUserLiked = response.data;

                    for (var i = 0; i < response.data.length; i++) {
                        document.getElementById(response.data[i].fileId).className = "btn btn-success";
                        //FILES USER HAS LIKED
                        //console.log(response.data[i].fileId);
                    }


                }, function (error) {
                    console.log(error.data);
                });
            }
        };



        $scope.toggleLike = function (fileId) {
            var userId = localStorage.getItem("userId");

            if (userId === null) {

                alert('Login to like');
                //IF ALREADY LIKED CALL UNLIKE FUNCTION
            } else if (document.getElementById(fileId).className === "btn btn-success") {
                $scope.unlikeFile(fileId);
                document.getElementById(fileId).className = "btn btn-default";

                //IF ALREADY UNLIKED CALL LIKE FUNCTION
            } else if (document.getElementById(fileId).className === "btn btn-default") {
                $scope.likeFile(fileId);
                document.getElementById(fileId).className = "btn btn-success";
            } else {
                console.log("error");
            }
        };
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

            //GET DESCRIPTION
            getDescription($scope.fileId);
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
            return $sce.trustAsResourceUrl("http://util.mw.metropolia.fi/uploads/" + url);
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

            var userId = localStorage.getItem("userId");
            if (userId === null) {
                alert('Login to like');

            } else {
                var request = ajaxService.likeFile(fileId, userId);
                request.then(function (response) {
                        console.log(fileId, userId);
                        console.log(response.data);
                    },
                    function (error) {
                        console.log(error.data);
                    });
            }
        };

        $scope.unlikeFile = function (fileId) {

            var userId = localStorage.getItem("userId");
            if (userId === null) {
                alert('Login to unlike');

            } else {
                var request = ajaxService.unlikeFile(fileId, userId);
                request.then(function (response) {
                        console.log(fileId, userId);
                        console.log(response.data);
                    },
                    function (error) {
                        console.log(error.data);
                    });
            }
        };

        //get description
        var getDescription = function (fileId) {
            var request = ajaxService.getDescription(fileId);
            request.then(function (response) {
                    $scope.description = response.data.description;

                    console.log("servicen jälkene: " + fileId);
                    console.log(response.data);
                },
                function (error) {
                    console.log(error.data);
                });

        };

        //get user's files

        var getFilesByUser = function () {
            var userId = localStorage.getItem('userId');
            console.log(userId);
            var request = ajaxService.getFilesByUser(userId);
            request.then(function (response) {
                $scope.userFiles = response.data;
                console.log('files by user: ' + response);
            }, function (error) {
                console.log(error.data);
            });
        };

    });