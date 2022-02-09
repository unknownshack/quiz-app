//Define Mongoose quiz schema

var mongoose = require('mongoose');
var userSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    userID:String,
    Date:Date,
    questionList:[Number],
    answers:{type:[String], default:[]},
    score:{type:[Boolean], default:[]}

});

module.exports = mongoose.model('Quiz', userSchema);
