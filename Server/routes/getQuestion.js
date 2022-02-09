var express = require('express');
var router = express.Router();
var Question = require('../models/question.js');
var Quiz = require('../models/quiz.js');
var bodyParser = require('body-parser');
//const { ConnectionClosedEvent } = require('mongodb');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/', urlencodedParser, function (req, res, next) {

    let quiz_id = req.body.Quiz_id;
    let questionNum = req.body.QuestionNum;
    //questionNum = parseFloat(questionNum);

    // retrieve user from database
    Quiz.find({ _id: quiz_id })
        .then(docs => {
            if (docs.length > 0) {
                // send user data back to client 
                var currentQuiz = docs[0];
                var questionList = currentQuiz.questionList;
                var currentQuestionID = questionList[questionNum];
                Question.find({ questionID: currentQuestionID })
                    .then(ques => {

                        var currentQuestion = ques[0];
                        
                        for(i in currentQuestion.answers){
                            currentQuestion.answers[i].isCorrect = false;
                        
                        }

                        //console.log(currentQuestion);
                        res.send(currentQuestion);

                    })

            } else {
                //res.send({message :'Incorrect Username and/or Password!'});
                console.log("no doc");
            }

        })
        .catch(err => {
            console.log(err);
        });
    //res.end();




});


//router.get("/", function(req, res, next) {
// res.send('respond with login');
//});

module.exports = router;