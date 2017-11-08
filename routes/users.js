const express = require('express');
const router = express.Router();
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongo = require('mongodb').mongo;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var User =  require('../models/user');

//register route
router.get('/register', function(req, res) {
    console.log("Register page was rendered");
    res.render('register');
});

//login route

router.get('/login', function(req, res) {
    console.log("Login page was rendered");
    res.render('login');
});

//register route
router.post('/register', function(req, res) {
    console.log("New user is being registered"); 
    let name = req.body.name;
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    let confirm = req.body.confirm;

    //Validation 
    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkBody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Username is required').notEmpty();
    req.checkBody('password', 'Password is required').notEmpty();
    req.checkBody('confirm', 'Passwords do not match').equals(req.body.password);
    let errors = req.validationErrors();
    if(errors) {
        res.render('register', {
            errors: errors
        });
    }
    else {
        console.log("No Errors");
        var newUser = new User({
            name: name,
            email: email,
            username: username,
            password: password
        });
        User.createUser(newUser, function(err, user){
            if(err) throw err;
            console.log(user);
        });
        req.flash('success_msg', 'You are registerd and can now login');
        res.redirect('/users/login');
    }
});

/*
passport.use(new localStrategy(
    function(username, password, done) {
        console.log("Local Strategy was executed");
        User.find(`{'username': '${username}'}`);

        User.getUserByUsername(username, function(err, user) {
            // console.log(`username is ${username}`);
            // console.log(`User.password is ${User.password}`);
            if (err) throw err;
            if (!user) {
                return done(null, false, {message: "unknown user"});
            }
        })

        console.log(User.getUserByUsername(username));
        User.comparePassword(password, User.password, function(err, isMatch) {
            // console.log(`User.password is ${User.password}`);
            if (err) throw err;
            if (isMatch) {
                return done(null, user);
            }
            else {
                return done(null, false, {message: "Invalid Password"});
            }
        })
    }
));
*/

passport.use(new localStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function (err, user) {
        if (user) {
            let userPassword = user.password; 
        }
        if (err) { 
            return done(err); 
        }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        User.comparePassword(password, user.password, function(err, isMatch) {
            // console.log(`User.password is ${User.password}`);
            if (err) { 
                return done(err); 
            }
            if (isMatch) {
                console.log("It's a match");
                return done(null, user);
            }
            else {
                console.log("Invalid Password");
                return done(null, false, {message: "Invalid Password"});
            }
        })
        // return done(null, user);
      });
    }
  ));

//Local Strategy

passport.deserializeUser(function(id, done) {
    console.log("Deserializer was used");    
    User.getUserById(id, function(err, user) {
      done(err, user);
    });
});

passport.serializeUser(function(user, done) {
    console.log("Serializer was used");
    return done(null, user.id);
});


//Post Request to Login
router.post('/login',
    passport.authenticate('local', {successRedirect: '/', failureRedirect: '/users/login', failureFlash: true}), 
    function(req, res) {
        console.log("User attempted login");
        res.redirect('/');
});

router.get('/logout', function(req, res) {
    req.logout();
    req.flash('success_msg', 'You are logged out');
    res.redirect('/users/login');
})

module.exports = router; 