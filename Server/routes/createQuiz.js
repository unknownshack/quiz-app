var express = require('express');
var router = express.Router();

/* GET users listing. */
var mongoose = require('mongoose');
var Quiz = require('../models/quiz.js');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })



function getRandomQuestions(quantity, max){
    const set = new Set();

    while(set.size < quantity) {
      set.add(Math.floor(Math.random() * (max + 1)));
    }
    return Array.from(set);
  }


router.post('/', urlencodedParser, function(req, res, next) {

    let userID = req.body.uid;

    var quiz = new Quiz({
        _id: new mongoose.Types.ObjectId(),
        userID:userID,
        Date:Date.now(),
        questionList:getRandomQuestions(10,100),        //set to random later
    
      });

      quiz
      .save()
      .then(result=>{
        console.log(result);
        res.send(result);
      })
      .catch(err=>{
        console.log(err);
        res.send({message: 'create quiz failed'});
      });


});

module.exports = router;