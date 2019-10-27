'user strict';
var request = require('request');
var credentials = require('../helpers/credentials');

var b2capi = function(accesstoken,initiator,amount,shortcode,phone,callback){
    let url = "https://sandbox.safaricom.co.ke/mpesa/b2c/v1/paymentrequest";
    let auth = "Bearer "+accesstoken;
    //600383
    request(
        {
            url : url,
            method:"POST",
            headers:{
              Authorization : auth
            },
            json:{
                "InitiatorName": initiator,
                "SecurityCredential": credentials.securityCredential,
                "CommandID": "SalaryPayment",
                "Amount": amount,
                "PartyA": shortcode,
                "PartyB": phone,
                "Remarks": "We have fully settled",
                "QueueTimeOutURL": credentials.callBackUrl,
                "ResultURL": credentials.callBackUrl,
                "Occasion": " "
            }
        },
        function(error,response,body){
            if(error){
                console.log(error);
            }
            else{
              returnB2C = JSON.stringify(body);
              callback(returnB2C);
              //req.b2cresult = res.status(200).json(body); 
            }
        }
    )
}
module.exports = b2capi;
