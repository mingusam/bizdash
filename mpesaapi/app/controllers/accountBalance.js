'user strict';
var request = require('request');
var securityCredential = require('../helpers/securitycredential');

var accountBalanceApi = function(req,res,next){
    let url = "https://sandbox.safaricom.co.ke/mpesa/accountbalance/v1/query";
    let auth = "Bearer "+req.access_token;
    
    request(
        {
            url : url,
            method:"POST",
            headers:{
              Authorization : auth
            },
            json:{
                "Initiator":"Emilio",
                "SecurityCredential": securityCredential,
                "CommandID":"AccountBalance",
                "PartyA":" ",
                "IdentifierType":"4",
                "Remarks":" ",
                "QueueTimeOutURL": "https://www.emiliomaingi.rf.gd/payments/callbackurl.php",
                "ResultURL": "https://www.emiliomaingi.rf.gd/payments/callbackurl.php",
            }
        },
        function(error,response,body){
            if(error){
                console.log(error);
            }
            else{
              req.accountBalanceResult = res.status(200).json(body); 
            }
        }
    )
}
module.exports = accountBalanceApi;
