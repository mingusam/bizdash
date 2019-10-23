'user strict';
var request = require('request');

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

var timestamp = function getTimeStamp() {
    return new Date().toISOString().replace(/T/, '').replace(/-/, '').replace(/:/, '').replace(/-/, '').replace(/:/, '').replace(/\..+/, '')
}

var lipaNaMpesa = function(accessToken, shortCode, amount, mobileNumber, accountReference, transactionDescription){
    let url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
    let auth = "Bearer "+ accessToken;
    let password = new Buffer(shortCode + "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919" + timestamp()).toString("base64");
    request(
        {
            url : url,
            method:"POST",
            headers:{
              Authorization : auth  
            },
            json:{
                "BusinessShortCode": shortCode,
                "Password": password,
                // "Timestamp": "20191016134250",
                "Timestamp": timestamp(),
                "TransactionType": "CustomerPayBillOnline",
                "Amount": amount,
                "PartyA": mobileNumber,
                "PartyB": shortCode,
                "PhoneNumber": mobileNumber,
                "CallBackURL": "https://www.emiliomaingi.rf.gd/payments/callbackurl.php",
                "AccountReference": accountReference,
                "TransactionDesc": transactionDescription
            }
        },
        function(error,response,body){
            if(error){
                console.log(error);
            }
            else{
                console.log('body: ' + JSON.stringify(body));
                // req.lipa = res.status(200).json(body);
                // return JSON.stringify(body);
                returnVal = JSON.stringify(body);
                return returnVal;
            }
        }
    )
}
module.exports = lipaNaMpesa;