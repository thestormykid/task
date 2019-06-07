var express = require('express');
var router  = express.Router();


var routes = {
    views: {
        comment: require('./views/comment'),
        index: require('./views/index')
    }
}


router.get('/getAllComments', routes.views.comment.getAllComments);
router.post('/addComment', routes.views.comment.addComment);
router.post('/upvot', routes.views.comment.upvote);
router.post('/downvote', routes.views.comment.downvote);

module.exports = router;