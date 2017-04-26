var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

router.get("/", function(req, res){
   res.render("landing");
});




//=============
// AUTH ROUTES
//=============

//register logic
router.post("/register", function(req, res){
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.redirect("back");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome aboard " + user.username + "!");
            res.redirect("back");
        });
    });
});


//LOGIN LOGIC
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "back",
        failureRedirect: "back",
        failureFlash: true,
        successFlash: "Welcome back!"
    }), function(req, res) {
      
});


//LOGOUT
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("info", "You have logged out");
    res.redirect("/campgrounds");
});

module.exports = router;