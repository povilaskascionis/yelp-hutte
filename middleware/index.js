var Comment = require("../models/comment")
var Campground = require("../models/campground")

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function (req, res, next){
    if(req.isAuthenticated()){
        Campground.findById(req.params.id, function(err, foundCampground){
            if(err){
                req.flash("error", "Something bad happened. Please try again later :(")
                res.redirect("back");
            } else {
                if(foundCampground.author.id.equals(req.user._id)){
                   next(); 
                } else {
                    req.flash("error", "You do not have permission to do that")
                    res.redirect("back");
                }
            }
        });
    } else {
        req.flash("error", "Please log in")
        res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, foundComment){
            if(err){
                res.redirect("back");
            } else {
                if(foundComment.author.id.equals(req.user._id)){
                   next(); 
                } else {
                    res.redirect("back");
                }
            }
        });
    } else {
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function (req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error", "Please log in ")
    res.redirect("back");
};

module.exports = middlewareObj;