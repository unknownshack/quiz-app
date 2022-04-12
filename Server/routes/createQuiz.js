//This page is related to the create quiz function from client

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Quiz = require('../models/quiz.js'); // get Quiz schema
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// generate a list of random quiz index
function getRandomQuestions(quantity, max){
    const set = new Set();

    while(set.size < quantity) {
      set.add(Math.floor(Math.random() * (max + 1)));
    }
    return Array.from(set);
  }

router.post('/', urlencodedParser, function(req, res, next) {

    let userID = req.body.uid;
    // create new quiz
    var quiz = new Quiz({
        _id: new mongoose.Types.ObjectId(),
        userID:userID,
        Date:Date.now(),
        //questionList:getRandomQuestions(0,100),        //! set to random later
        questionList:[0,110,57,3,73,5,81,84,8,9], 
      });
      // save quiz into database
      quiz
      .save()
      .then(result=>{
        //console.log(result);
        res.send(result);
      })
      .catch(err=>{
        console.log(err);
        res.send({message: 'create quiz failed'});
      });

});

module.exports = router;