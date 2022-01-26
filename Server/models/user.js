//Define Mongoose User schema

var mongoose = require('mongoose');
var userSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,        
    name: String,
    mobile: String,
    email:String,
    callback:Boolean,

});

module.exports = mongoose.model('User', userSchema);