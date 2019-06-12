var Comment     = require('../../model/comment');
var mongoose    = require('mongoose');
var ObjectId 	= require('mongodb').ObjectID;



module.exports = {

    getAllComments: function(req, res) {
        Comment.find({}).populate('userDetails', {name: 1}).sort().exec(function(err, allComments) {
            if(err) {
                console.log(err);
                res.status(500).json(err);
                return;
            }

            res.status(200).json({allComments: allComments, user: req.user})
        })
    },

    addComment: function(req,res) {
        var id = ObjectId(req.user._id);
        var singleComment= req.body.comment;
        singleComment.userDetails  = id;
        singleComment.upvotedList = [];
        singleComment.downvoteList = [];

        Comment.create(singleComment, function(err,comm) {
            if(err) {
                res.status(500).json(err);
                console.log(err);
                return;
            }

            return res.status(200).json(comm);
        });
    },

    upvote: function(req,res) {
        var id=ObjectId(req.body.comment_id);
        var old=Number(req.body.upvote);
        var userId = ObjectId(req.user._id);
        // console.log(req.body.)


        Comment.findOne({_id: id, upvotedList: userId}, function(err, checkForUpvote) {
            if (err) {
                console.log(err);
                return res.status(500).json(err);

            }
            console.log(checkForUpvote);
            if (checkForUpvote) {
                return res.status(200).json("already upvoted");

            } else {
                Comment.findByIdAndUpdate(id, {
                    $push: {upvotedList: userId},
                    upvote: old + 1,
                }, function(err, upv) {
                    if(err) {
                        console.log(err);
                        res.status(500).json(err);
                        return;
                    }

                    res.status(200).json("upvoted successfully");
                });

            }
        })
    },

    downvote: function(req, res) {
        var id=ObjectId(req.body.comment_id);
        var old=Number(req.body.downvote);
        var userId = ObjectId(req.user._id);

        Comment.findOne({_id: id, downvotedList: userId}, function(err, checkFordownvote) {
            if (err) {
                console.log(err);
                return res.status(500).json(err);

            }

            if (checkFordownvote) {
                return res.status(200).json("already downvoted");

            } else {
                Comment.findByIdAndUpdate(id,{
                    $push: {downvotedList: userId},
                    downvote : old+1
                }, function(err,dnv) {
                    if(err) {
                        console.log(err);
                        res.status(200).json(err);
                        return;
                    }

                    res.status(200).json("downvoted successfully");
                });
            }
        })
    }
}
