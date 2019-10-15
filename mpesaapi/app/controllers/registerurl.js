'user strict';
var request = require('request');
var registerc2burl = function(req,res,next){
    let url = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/registerurl";
    let auth = "Bearer "+req.access_token;
    console.log(req.access_token);
    request(
        {
            url: url,
            method:"POST",
            headers:{
                "Authorization" : auth
            },
            json : {
                "ShortCode":"600383",
                "ResponseType":"complete",
                "ConfirmationURL": "https://www.emiliomaingi.rf.gd/payments/confirmationURL.php",
                "ValidationURL": "https://www.emiliomaingi.rf.gd/payments/validationURL.php"
            }
        },
        function (error,response,body){
            if(error){
                console.log(error);
            }
            else{
                req.result = res.status(200).json(body);
                next();
            }
        }
    )
}
module.exports = registerc2burl;