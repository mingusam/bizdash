var express = require("express");
var app = express();
app.use(express.json())
var db = require("./app/models/db.js");

var generatetoken = require("./app/controllers/accesstoken.js");
var registerc2burl = require('./app/controllers/registerurl.js');
var c2bapi = require('./app/controllers/c2btransactions.js');
var b2capi = require('./app/controllers/b2ctransactions.js');
var b2bapi = require('./app/controllers/b2btransactions.js');
// var lipaNaMpesaApi = require('./app/controllers/lipanampesatransaction.js');
var lipaNaMpesa = require('./app/controllers/lipaNaMpesa.js');
var accountBalanceApi = require('./app/controllers/accountBalance.js');

app.get('/', function(req,res){
    res.send("Hello Mpesa");
});

app.get('/accesstoken', generatetoken,function(req,res){
    res.status(200).json(req.access_token);
});

app.post('/registerc2b',generatetoken,registerc2burl, function(req,res){
 res.send(JSON.parse(req.result));
})

app.post('/simulatec2b',generatetoken,function(req,res){
  var accesstoken = req.access_token;
  var shortcode = req.body.shortcode;
  var amount = req.body.amount;
  var phone = req.body.phone;
  var companyid = req.body.companyid;
  var transactiontype = "c2b";
  var transactiondescription = req.body.transactiondescription;
  
  c2bapi(accesstoken,shortcode,amount,phone,function(returnC2B){
    var sql = "Insert into transactions(transactiontype,companyid,amount,partyA,partyB,description) values(?,?,?,?,?,?)"
    db.query(sql,[transactiontype,companyid,amount,phone,shortcode,transactiondescription],function(err,result){
      if(err){
        console.log(err);
      }
      else{
        console.log("Data inserted successfully");
      }
    });
    res.send(JSON.parse(returnC2B));
  });
  //res.send(JSON.parse(req.c2boutput));
});

app.post('/simulateb2c',generatetoken, function(req,res){
  var accesstoken = req.access_token;
  var shortcode = req.body.shortcode;
  var amount = req.body.amount;
  var initiator = req.body.initiator;
  var phone = req.body.phone;
  var companyid = req.body.companyid;
  var transactiontype = "b2c";
  var description = req.body.description;

  b2capi(accesstoken,initiator,amount,shortcode,phone,function(returnB2C){
    var sql = "Insert into transactions(transactiontype,companyid,initiatorname,amount,partyA,partyB,description) values(?,?,?,?,?,?,?)"
    db.query(sql,[transactiontype,companyid,initiator,amount,shortcode,phone,description],function(err,result){
      if(err){
        console.log(err);
      }
      else{
        console.log("Data inserted successfully");
      }

    });
    res.send(JSON.parse(returnB2C));
  });
})

// app.post('/lipa-na-mpesa-payment',generatetoken, lipaNaMpesaApi, function(req,res){
//   res.send(JSON.parse(req.lipaNaMpesaApiResult));
// })

app.post('/lipa-na-mpesa',generatetoken, function(req,res){
  var accessToken =  req.access_token;
  var shortCode = req.body.shortCode;
  var amount = req.body.amount;
  var mobileNumber = req.body.mobileNumber;
  var accountReference = req.body.accountReference;
  var transactionDescription = req.body.transactionDescription;
  var companyid = req.body.companyid;
  var transactiontype = req.body.transactiontype;
  var initiator = req.body.initiator;

  lipaNaMpesa(accessToken, shortCode, amount, mobileNumber,accountReference, transactionDescription, function(returnVal){
    var sql = "Insert into transactions(transactiontype,companyid,initiatorname,amount,partyA,partyB,description,reference) values(?,?,?,?,?,?,?,?)";

    db.query(sql,[transactiontype,companyid,initiator,amount,mobileNumber,shortCode,transactionDescription,accountReference], function(err,result){
      if(err){
        console.log(err);
      }
      else{
        console.log("Data inserted successfully");
      }
    });
    res.send(JSON.parse(returnVal))
    

  });
})

app.post('/account-balance',generatetoken, accountBalanceApi, function(req,res){
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

app.post('/simulateb2b',generatetoken,function(req,res){
    var accesstoken = req.access_token;
    var initiator = req.body.initiator;
    var amount = req.body.amount;
    var partya = req.body.partya;
    var partyb = req.body.partyb;
    var companyid = req.body.companyid;
    var description = req.body.description;
    var transactiontype = "b2b";
    
    b2bapi(accesstoken,initiator,amount,partya,partyb,function(returnB2B){
      var sql = "insert into transactions(transactiontype,companyid,initiatorname,amount,partyA,partyB,description,reference) values(?,?,?,?,?,?,?,?)";
      db.query(sql,[transactiontype,companyid,initiator,amount,partya,partyb,description,partya],function(err,result){
        if(err){
          console.log(err);
        }
        else{
          console.log("Data inserted successfully");
        }
      }); 
      res.send(JSON.parse(returnB2B));
    });
    
    //res.send(JSON.parse(req.b2bresult));
});
  
app.listen(3000, () => {
    console.log("Server running on port 3000");
});