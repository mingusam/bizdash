'user strict';

var request = require("request");
var credentials = require('../helpers/credentials');

var reversalapi = function(req,res,next){
    let url = "https://sandbox.safaricom.co.ke/mpesa/reversal/v1/request";
    let auth = "Bearer "+req.access_token;

    request(
        {
            url : url,
            method:"POST",
            headers:{
              Authorization : auth
            },
            json: {
                "Initiator": "James",
                "SecurityCredential": credentials.securityCredential,
                "CommandID":"TransactionReversal",
                "Amount":400,
                "RecieverParty":"400",
                ""
        
            }
        }
    )
}