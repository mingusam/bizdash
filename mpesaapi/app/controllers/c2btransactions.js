'user strict';
var request = require('request');
var db = require('../models/db.js');
var c2bapi = function(accesstoken,shortcode,amount,phone,callback){
    let url = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/simulate";
    let auth = "Bearer "+ accesstoken;
    request(
        {
            url: url,
            method:"POST",
            headers:{
                Authorization: auth
            },
            json: {
                "ShortCode":shortcode,
                "CommandID":"CustomerPayBillOnline",
                "Amount":amount,
                "Msisdn":phone,
                "BillRefNumber":"TestAPI"
            }
        },
        function(error,response,body){
           if(error){
               console.log(error);
           }
           else{
              returnC2B = JSON.stringify(body);
              console.log(returnC2B);
              callback(returnC2B);
           }
        }
    )
}
module.exports = c2bapi;