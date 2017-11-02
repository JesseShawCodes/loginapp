const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var  userSchema = mongoose.Schema({
    username: {
        type: String,
        index: true
    },
    password: {
        type: String,
    },
    email: {
        type: String,
    },
    name: {
        type: String
    }
});



var User = module.exports = mongoose.model('User', userSchema);


//Password encryption
module.exports.createUser = function(newUser, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            console.log("Password encryption was executed from the model file");
            // Store hash in your password DB. 
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.getUserByUsername = function(username, callback) {
    console.log("GetUserByUsernam was executed from the model file");
    let query = {username: username};
    User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback) {
    console.log("GetUserByID was executed from the model file");
    User.findById(id, callback);
}

module.exports.comparePassword = function(canditatePassword, hash, callback) {
    // Load hash from your password DB.
    console.log("comparePassword was executed from the model file");
    console.log(`${canditatePassword}, ${hash}, ${callback}`);
    bcrypt.compare(canditatePassword, hash, function(err, isMatch) {
        console.log(`canditatePassword is ${canditatePassword}`);
        if(err) throw err;
        callback(null, isMatch);
    });
}