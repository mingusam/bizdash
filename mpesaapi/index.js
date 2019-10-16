var express = require("express");
var app = express();
bodyParser = require('body-parser');
var db = require("./app/models/db.js");
var generatetoken = require("./app/controllers/accesstoken.js");
var request = require('request');
var registerc2burl = require('./app/controllers/registerurl.js');
var c2bapi = require('./app/controllers/c2btransactions.js');
var b2capi = require('./app/controllers/b2ctransactions.js');
var lipaNaMpesaApi = require('./app/controllers/lipanampesatransaction.js');

app.get('/', function(req,res){
    res.send("Hello Mpesa");
});
app.get('/accesstoken', generatetoken,function(req,res){
    res.status(200).json(req.access_token);
});
app.get('/registerc2b',generatetoken,registerc2burl, function(req,res){
 res.send(JSON.parse(req.result));
})
app.get('/simulatec2b',generatetoken, c2bapi, function(req,res){
 res.send(JSON.parse(req.c2boutput));
})
app.get('/simulateb2c',generatetoken, b2capi, function(req,res){
  res.send(JSON.parse(req.b2cresult));
})
app.get('/lipa-na-mpesa-payment',generatetoken, lipaNaMpesaApi, function(req,res){
  res.send(JSON.parse(req.lipaNaMpesaApiResult));
})
app.get('/simulateb2b',generatetoken,b2bapi,function(req,res){
    res.send(JSON.parse(req.b2bresult));
  })
  
app.listen(3000, () => {
    console.log("Server running on port 3000");
});