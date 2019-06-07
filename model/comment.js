var mongoose = require('mongoose');

var CommentSchema=mongoose.Schema({
    body: {type: String, required: true},
    upvote: {type: Number, required: true, default: 0},
    downvote: {type: Number, required: true, default: 0}
});


var comments=mongoose.model("Comments",CommentSchema);

module.exports = comments;