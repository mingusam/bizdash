'user strict';
var request = require('request');

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
    let password = new Buffer(shortcode + "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919" + timestamp()).toString("base64");
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
                // "Timestamp": "20191016134250",
                "Timestamp": timestamp(),
                "TransactionType": "CustomerPayBillOnline",
                "Amount": amount,
                "PartyA": phone,
                "PartyB": shortcode,
                "PhoneNumber": phone,
                "CallBackURL": "https://www.emiliomaingi.rf.gd/payments/callbackurl.php",
                "AccountReference": accountref,
                "TransactionDesc": transactiondesc
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
