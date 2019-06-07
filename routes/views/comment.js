var Comment = require('../../model/comment');
var mongoose = require('mongoose');


module.exports = {

    getAllComments: function(req, res) {
        comments.find({}, function(err, allComments) {
            if(err) {
                console.log(err);
                res.status(500).json(err);
                return;
            }

            res.status(200).json(allComments)
        });
    },

    addComment: function(req,res) {
        var body= req.body.comment;
        var nComment= {body,upvote:0,downvote:0};

        console.log(nComment);
        comments.create(nComment,function(err,comm) {
            if(err) {
                res.status(500).json(err);
                console.log(err);
                return;
            }

            res.status(200).json(comm);
        });
    },

    upvote: function(req,res) {
        var id=req.body.id;
        var old=Number(req.body.val);

        comments.findByIdAndUpdate(id, {upvote : old+1 },function(err,upv) {
            if(err) {
                console.log(err);
                res.status(500).json(err);
                return;
            }

            res.status(200).json(upv);
        });
    },

    downvote: function(req, res) {
        var id=req.body.id;
        var old=Number(req.body.val);

        comments.findByIdAndUpdate(id, {downvote : old+1 },function(err,dnv) {
            if(err) {
                console.log(err);
                res.status(200).json(err);
                return;
            }

            res.status.json(dnv);
        });
    }


}