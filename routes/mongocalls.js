const express = require('express');
var app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const expresshbs = require('express-handlebars');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const mongo = require('mongodb');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:3030');
const db = mongoose.connection;
mongoose.set( "debug", true );
var port = 3030;

var MongoClient = require('mongoDB').MongoClient;

MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, db){
    if( !err ){
         console.log("We are connected");
    } else console.log(err);
});

var User =  require('../models/user');

console.log(User.db.collection);
