'user strict';
var request = require('request');
var securityCredential = require('../helpers/securitycredential');

var b2capi = function(req,res,next){
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
                "SecurityCredential": securityCredential,
                "CommandID": "SalaryPayment",
                "Amount": "1",
                "PartyA": "600383",
                "PartyB": "254720202978",
                "Remarks": "We have fully settled",
                "QueueTimeOutURL": "https://www.emiliomaingi.rf.gd/payments/callbackurl.php",
                "ResultURL": "https://www.emiliomaingi.rf.gd/payments/callbackurl.php",
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
