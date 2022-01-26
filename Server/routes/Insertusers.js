//this page is related to the register function from Client 
var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = require('../models/user.js'); //user schema
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })


router.post('/', urlencodedParser, function(req, res, next) {

  let Email = req.body.Email;
  let Name = req.body.Name;
  let Mobile = req.body.Mobile;
  let Callback = req.body.Callback;

  if (!Name) {
    return res.status(400).send({ error:true, message: 'Please provide user name' });
  }

  if (!Email) {
    return res.status(400).send({ error:true, message: 'Please provide Email' });
  }

  // check if the database already has the user
  User.find({name:Name, mobile:Mobile})
			.exec()
			.then(docs=>{

				if (docs.length>0) {

					res.send({message: 'Existing user identified. Please login'});
	
				} else {	
          // create new user based on the User schema
          var user = new User({
            _id: new mongoose.Types.ObjectId(),   //generate unique id
            name: Name,
            mobile : Mobile,
            email: Email,
            callback:Callback
          });

          //insert new user to database
          user
          .save()
          .then(result=>{
            console.log(result);
            res.send({message: 'Register successfully'});
          })
          .catch(err=>{
            console.log(err);
            res.send({message: 'Register failed'});
          });
				}

			})
			.catch(err=>{
				console.log(err);
			});	

  //res.redirect('http://localhost:3000/Register');
});

module.exports = router;
