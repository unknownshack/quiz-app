var express = require('express');
var router = express.Router();

/* GET users listing. */
var mongoose = require('mongoose');
var User = require('../models/user.js');

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


  User.find({name:Name, mobile:Mobile})
			.exec()
			.then(docs=>{

				if (docs.length>0) {

					res.send({message: 'Existing user identified. Please login'});
	
				} else {	
          var user = new User({
            _id: new mongoose.Types.ObjectId(),
            name: Name,
            mobile : Mobile,
            email: Email,
            callback:Callback
        
          });

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
