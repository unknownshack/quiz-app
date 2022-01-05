var express = require("express");
var router = express.Router();

var User = require('../models/user.js');

router.get("/", function(req, res, next) {

  User.find()
    .exec()
    .then(docs=>{
      res.send(docs);
    })
    .catch(err=>{
      console.log(err);
    });

});

module.exports = router;