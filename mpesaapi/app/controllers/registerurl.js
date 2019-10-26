'user strict';
var request = require('request');
var credentials = require('../helpers/credentials');

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
                "ConfirmationURL": credentials.confirmationUrl,
                "ValidationURL": credentials.validationUrl
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