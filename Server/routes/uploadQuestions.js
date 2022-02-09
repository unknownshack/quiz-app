var express = require('express');

var mongoose = require('mongoose');
var Question = require('../models/question.js'); // get Question schema
var allQuestions = require('./Questions.js');


var url = "mongodb+srv://mettle:w2k_pass@ppc.ncydd.mongodb.net/myCollections?retryWrites=true&w=majority";
//var url = 'mongodb://127.0.0.1:27017'; not using local mongodb service

const options = {
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
};

mongoose.connect(url, options).then(
    () => { console.log("mongoDB connected"); },
);
  
  const db = mongoose.connection
  
  db.on('error', err => {
    console.error('connection error:', err)
  })
  

for(const index in allQuestions){

    currentQuestion = allQuestions[index];

    var question = new Question({
        questionID:index,
        questionText:currentQuestion.questionText,
        questionType:currentQuestion.questionType,
        isMultipleChoice: currentQuestion.isMultipleChoice,
        isVocalQuestion:currentQuestion.isVocalQuestion,
        isForcedAnswer: currentQuestion.isForcedAnswer,
        isShortAnswer: currentQuestion.isShortAnswer,
        isDrawingQuestion: currentQuestion.isDrawingQuestion,
        answers:currentQuestion.answers
    });

    question
    .save()
    .catch(err=>{
      console.log(err);
    });
}

//






