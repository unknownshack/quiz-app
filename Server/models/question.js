//Define Mongoose question schema

var mongoose = require('mongoose');
var questionSchema = mongoose.Schema({

    questionID:Number,
    questionText:String,
    questionType:String,
    isMultipleChoice: Boolean,
    isVocalQuestion: Boolean,
    isForcedAnswer: Boolean,
    isShortAnswer: Boolean,
    isDrawingQuestion: Boolean,
    answers:[{answerText: String,
              answerImg: String,
              isCorrect: Boolean}]
});

module.exports = mongoose.model('Question', questionSchema);
