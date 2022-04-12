// this page will get quiz results for all questions
var express = require('express');
var router = express.Router();
var Question = require('../models/question.js');
var Quiz = require('../models/quiz.js');
var bodyParser = require('body-parser');
//const { ConnectionClosedEvent } = require('mongodb');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/', urlencodedParser, function (req, res, next) {

    let quiz_id = req.body.Quiz_id;
 
    Quiz.find({ _id: quiz_id })
    .then(docs => {
        if (docs.length > 0) {

            var currentQuiz = docs[0];
            var answers  = currentQuiz.answers;

            console.log(answers);
            res.send({answer: answers});


        }
    })
    
});


module.exports = router;