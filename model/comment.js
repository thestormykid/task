var mongoose = require('mongoose');

var CommentSchema=mongoose.Schema({
    userDetails: {type: mongoose.Schema.Types.ObjectId, ref:'user', required: true},
    body: {type: String, required: true},
    upvote: {type: Number, required: true, default: 0},
    downvote: {type: Number, required: true, default: 0},
    upvotedList: [{type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true}],
    downvotedList: [{type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true}]
});


var comments=mongoose.model("Comments", CommentSchema);

module.exports = comments;
