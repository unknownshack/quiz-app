/*
var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "cecilia1996",
  database: "ppc"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

  var sql = "INSERT INTO user_information (UID,Name,Email,Mobile,Callback) VALUES (1002,'Name 1','name1@gmail.com','0426801696','0')";

  con.query(sql, function (err, result) {
    if (err) throw err;

    //can do things with result object. eg result.insertID
    console.log("1 record inserted");   
  });


  con.query("SELECT * FROM user_information", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });


});*/