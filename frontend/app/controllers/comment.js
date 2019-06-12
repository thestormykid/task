forum.controller('commentCtrl', ['$scope', 'commentService', function($scope, commentService) {

    $scope.comment = {
        upvote: 0,
        downvote: 0,
        body: ""
    };
    $scope.user = {};

    $scope.allComments = [];

    var hulla = new hullabaloo();

    $scope.addComment = function() {
        commentService.addComment($scope.comment)
            .then(function (success) {
                hulla.send('comment added successfully', 'success');
                $scope.allComments = getAllComments();
                resetValue();

            }, function(failure) {
                hulla.send(failure, 'danger');
            })
    }

    $scope.upvote = function(comment) {

        commentService.upVote(comment._id, comment.upvote)
            .then(function (success) {
                console.log(success);
                if (success == 'already upvoted') {
                    hulla.send('already upvoted', 'info');
                    return;

                } else {
                    hulla.send('upvoted', 'success');
                    comment.upvote  +=  1;
                    return;

                }

                }, function (falilure) {
                    hulla.send(failure, 'danger');

            })
    }

    $scope.downvote = function(comment) {
        commentService.downVote(comment._id, comment.downvote)
            .then(function (success) {
                if (success == 'already downvoted') {
                      hulla.send('already downvoted', 'info');
                    return;
                } else {
                    hulla.send('downvoted', 'success');
                    comment.downvote += 1;
                    return;

                }

            }, function (falilure) {
                hulla.send(failure, 'danger');

            })
    }

    function resetValue() {
        $scope.comment = {
            upvote: 0,
            downvote: 0,
            body: ""
        };
    }

    function getAllComments() {
        commentService.getAllComments()
            .then(function (success) {
                $scope.allComments = success.allComments;
                $scope.user =  success.user
                console.log($scope.user);

            }, function (failure) {
                console.log(failure);
                if (failure == 'Unauthorized') {
                    localStorage.setItem('token', "");
                }

            })
    }

    getAllComments();
}])
