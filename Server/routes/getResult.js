var express = require('express');
var router = express.Router();
var Question = require('../models/question.js');
var Quiz = require('../models/quiz.js');
var bodyParser = require('body-parser');
//const { ConnectionClosedEvent } = require('mongodb');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/', urlencodedParser, function (req, res, next) {


    let quiz_id = req.body.Quiz_id;
    console.log(quiz_id);

    Quiz.find({ _id: quiz_id })
    .then(docs => {
        if (docs.length > 0) {

            var currentQuiz = docs[0];
            var answers  = currentQuiz.answers;

            
            /*
            var questionList = currentQuiz.questionList;
      
            var questionTexts = [];
            var correctAnswers = [];
                
            for (index in questionList){

                var currentQuestionID = questionList[index];

                Question.find({ questionID: currentQuestionID })
                    .then(ques => {

                        var currentQuestion = ques[0];

                        questionTexts[index] = currentQuestion.questionText;
                        
                        for(i in currentQuestion.answers){

                            if(currentQuestion.answers[i].isCorrect == true){

                                correctAnswers[index] = currentQuestion.answers[i].answerText;

                            }
                        
                        }

                        //console.log(currentQuestion);

                    })
            }*/

            console.log(answers);

            res.send({answer: answers});


        }
    })
    
});


module.exports = router;