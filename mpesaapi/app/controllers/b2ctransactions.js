'user strict';
var request = require('request');
var credentials = require('../helpers/credentials');

var b2capi = function(req,res,next){
    var initiator = req.body.initiator;
    var amount = req.body.amount;
    var shortcode = req.body.shortcode;
    var phone = req.body.phone;
    let url = "https://sandbox.safaricom.co.ke/mpesa/b2c/v1/paymentrequest";
    let auth = "Bearer "+req.access_token;
    request(
        {
            url : url,
            method:"POST",
            headers:{
              Authorization : auth
            },
            json:{
                "InitiatorName": "Samuel",
                "SecurityCredential": credentials.securityCredential,
                "CommandID": "SalaryPayment",
                "Amount": "1",
                "PartyA": "600383",
                "PartyB": "254720202978",
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
              req.b2cresult = res.status(200).json(body); 
            }
        }
    )
}
module.exports = b2capi;
