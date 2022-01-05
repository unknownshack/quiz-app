var express = require('express');
var router = express.Router();

/* GET users listing. */
var router = express.Router();

var User = require('../models/user.js');

var bodyParser = require('body-parser');
const { ConnectionClosedEvent } = require('mongodb');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/', urlencodedParser, function(req, res, next) {

    let Email = req.body.Email;
    let Mobile = req.body.Mobile;

    if (Email && Mobile) {

		User.find({email:Email, mobile:Mobile})
			.then(docs=>{
				if (docs.length>0) {

					res.send(docs);
	
				} else {
					res.send({message :'Incorrect Username and/or Password!'});
				}

			})
			.catch(err=>{
				console.log(err);
			});	
			//res.end();
		
	} else {
		res.send({message:'Please enter Username and Password!'});
		res.end();
	}
  


});


//router.get("/", function(req, res, next) {
 // res.send('respond with login');
//});
  
module.exports = router;
  