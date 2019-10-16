'user strict';
var request = require('request');
var lipaNaMpesaApi = function(req,res,next){
    let url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
    let auth = "Bearer "+req.access_token;
    let password = new Buffer("174379" + "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919" + "20191016134250").toString("base64");
    request(
        {
            url : url,
            method:"POST",
            headers:{
              Authorization : auth
            },
            json:{
                "BusinessShortCode": "174379",
                "Password": password,
                "Timestamp": "20191016134250",
                "TransactionType": "CustomerPayBillOnline",
                "Amount": "1",
                "PartyA": "254757830711",
                "PartyB": "174379",
                "PhoneNumber": "254757830711",
                "CallBackURL": "https://www.emiliomaingi.rf.gd/payments/callbackurl.php",
                "AccountReference": "Emilio 254757830711",
                "TransactionDesc": "Payment for October Salary"
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
