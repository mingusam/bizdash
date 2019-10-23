var express = require("express");
var app = express();
app.use(express.json())
var db = require("./app/models/db.js");

var generatetoken = require("./app/controllers/accesstoken.js");
var registerc2burl = require('./app/controllers/registerurl.js');
var c2bapi = require('./app/controllers/c2btransactions.js');
var b2capi = require('./app/controllers/b2ctransactions.js');
var lipaNaMpesaApi = require('./app/controllers/lipanampesatransaction.js');
var lipaNaMpesa = require('./app/controllers/lipaNaMpesa.js');
var accountBalanceApi = require('./app/controllers/accountBalance.js');

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

app.post('/lipa-na-mpesa-payment',generatetoken, lipaNaMpesaApi, function(req,res){
  res.send(JSON.parse(req.lipaNaMpesaApiResult));
})

app.post('/lipa-na-mpesa',generatetoken, function(req,res){
  var accessToken =  req.access_token;
  var shortCode = req.body.shortCode;
  var amount = req.body.amount;
  var mobileNumber = req.body.mobileNumber;
  var accountReference = req.body.accountReference;
  var transactionDescription = req.body.transactionDescription;

  

  // var lipa = lipaNaMpesa(accessToken, shortCode, amount, mobileNumber,accountReference, transactionDescription)
  console.log('Lipa: '+ lipaNaMpesa(accessToken, shortCode, amount, mobileNumber,accountReference, transactionDescription));
  res.send(lipaNaMpesa(accessToken, shortCode, amount, mobileNumber,accountReference, transactionDescription));
  // res.send(JSON.parse(req.lipa));
  // next()
})

app.get('/account-balance',generatetoken, accountBalanceApi, function(req,res){
  res.send(JSON.parse(req.accountBalanceResult));
})

app.post('/validation', (req, res) => {
  console.log('...........validation...........')
  console.log(req.body)
})

app.post('/confirmation', (req, res) => {
  console.log('...........confirmation...........')
  console.log(req.body)
})

app.listen(3000, () => {
    console.log("Server running on port 3000");
});