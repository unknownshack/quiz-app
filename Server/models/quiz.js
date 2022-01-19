var mongoose = require('mongoose');
var userSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,
    userID:String,
    Date:Date,
    questionList:[Number],

});

module.exports = mongoose.model('Quiz', userSchema);