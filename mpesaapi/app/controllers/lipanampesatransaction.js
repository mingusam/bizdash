'user strict';
var request = require('request');
var credentials = require('../helpers/credentials');

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

var timestamp = function getTimeStamp() {
    return new Date().toISOString().replace(/T/, '').replace(/-/, '').replace(/:/, '').replace(/-/, '').replace(/:/, '').replace(/\..+/, '')
}

var lipaNaMpesaApi = function(req,res,next){
    var shortcode = req.params.shortcode;
    var amount = req.params.amount;
    var phone = req.params.phone;
    var accountref = req.params.accountref;
    var transactiondesc = req.params.transactiondesc;

    let url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
    let auth = "Bearer "+req.access_token;
    let password = new Buffer(shortCode + credentials.passkey + timestamp()).toString("base64");
    request(
        {
            url : url,
            method:"POST",
            headers:{
              Authorization : auth  
            },
            json:{
                "BusinessShortCode": shortcode,
                "Password": password,
                "Timestamp": timestamp(),
                "TransactionType": "CustomerPayBillOnline",
                "Amount": amount,
                "PartyA": mobileNumber,
                "PartyB": shortCode,
                "PhoneNumber": mobileNumber,
                "CallBackURL": credentials.callBackUrl,
                "AccountReference": accountReference,
                "TransactionDesc": transactionDescription
            }
        },
        function(error,response,body){
            if(error){
                console.log(error);
            }
            else{
                
                req.lipaNaMpesaResult = res.status(200).json(body); 
            }
        }
    )
}
module.exports = lipaNaMpesaApi;
