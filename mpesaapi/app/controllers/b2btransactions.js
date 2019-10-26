'user strict';
var request = require('request');
var b2bapi = function(req,res,next){
    var initiator = req.body.initiator;
    var amount = req.body.amount;
    var partya = req.body.partya;
    var partyb = req.body.partyb;
    let url = "https://sandbox.safaricom.co.ke/mpesa/b2b/v1/paymentrequest";
    let auth = "Bearer "+req.access_token;
//600383
//174174
    request(
        {
          method: 'POST',
          url : url,
          headers : {
            "Authorization" : auth
          },
        json : {
          "Initiator": initiator,
          "SecurityCredential": "bj8drAXAZUeX2i+1U06yC4vk4tRzu2a75oH5/aSC4n+FsNsHlENqRrKCNojIs5A4yGhuRZzW29X0Cvk5M4z/j0GE7P2TxjqR8pofL4AoeYfdcHu6GXR4gqCfxxuQ4LDK3CW5mEyKXQCPrdog9T52LWk6Bn7sLV9Xb/nVZpuTKMvI0sGHCCNK4P9cMJ31owNeyF5BgGmcGY+GAb7Kq+0nNs/eYFi+RzLv/P3VsjpQNyitzuloUSvNrufrquva5m2w6JuImLtRuofPWapbLMuceyYJAnZOW5PZCO+gyNqFqnvR6TgRysoUaapLyNTd5iidO1VTS5Tu8Ed7jkq+PSjJBg==",
          "CommandID": "MerchantToMerchantTransfer",
          "SenderIdentifierType": "4",
          "RecieverIdentifierType": "4",
          "Amount": amount,
          "PartyA": partya,
          "PartyB": partyb,
          "AccountReference": partya,
          "Remarks": "Money paid fully",
          "QueueTimeOutURL": "https://www.emiliomaingi.rf.gd/payments/callbackurl.php",
          "ResultURL": "https://www.emiliomaingi.rf.gd/payments/callbackurl.php"
        }
      },
        function (error, response, body) {
          // TODO: Use the body object to extract the response
          if(error){
              console.log(error);
          }
          else{
              req.b2bresult = res.status(200).json(body);
          }
        }
      )
    
}
module.exports = b2bapi;
