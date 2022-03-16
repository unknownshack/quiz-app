var express = require('express');
var router = express.Router();
var Question = require('../models/question.js');
var Quiz = require('../models/quiz.js');
var bodyParser = require('body-parser');
//const { ConnectionClosedEvent } = require('mongodb');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/', urlencodedParser, function (req, res, next) {

    console.log("upload answers");

    let quiz_id = req.body.Quiz_id;
    let answer = req.body.Answer;

    if(!answer){

        answer = "";
    }
    
    Quiz.updateOne(
        { _id: quiz_id },
        {
            $push:
                {
                    answers: answer
                }
        }
    )
    .then(result=>{

        console.log(result);
        res.send({message: "successful"});

    })
    .catch(err => {
        console.log(err);
    });


    

});


module.exports = router;