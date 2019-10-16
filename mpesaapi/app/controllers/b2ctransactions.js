'user strict';
var request = require('request');
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
                "SecurityCredential":"bj8drAXAZUeX2i+1U06yC4vk4tRzu2a75oH5/aSC4n+FsNsHlENqRrKCNojIs5A4yGhuRZzW29X0Cvk5M4z/j0GE7P2TxjqR8pofL4AoeYfdcHu6GXR4gqCfxxuQ4LDK3CW5mEyKXQCPrdog9T52LWk6Bn7sLV9Xb/nVZpuTKMvI0sGHCCNK4P9cMJ31owNeyF5BgGmcGY+GAb7Kq+0nNs/eYFi+RzLv/P3VsjpQNyitzuloUSvNrufrquva5m2w6JuImLtRuofPWapbLMuceyYJAnZOW5PZCO+gyNqFqnvR6TgRysoUaapLyNTd5iidO1VTS5Tu8Ed7jkq+PSjJBg==",
                "CommandID": "SalaryPayment",
                "Amount": "100",
                "PartyA": "600383",
                "PartyB": "254722632126",
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
