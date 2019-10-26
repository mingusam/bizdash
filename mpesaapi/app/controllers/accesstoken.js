'user strict';
var request = require('request');
var credentials = require('../helpers/credentials');

var generatetoken = function access(req,res,next){
    consumer_key = credentials.consumerKey,
    consumer_secret = credentials.consumerSecret,
    url = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials"
    auth = "Basic " + new Buffer(consumer_key + ":" + consumer_secret).toString("base64");

    request(
        {
        url : url,
        headers : {
            "Authorization" : auth
        }
        },
        function (error, response, body) {
        // TODO: Use the body object to extract OAuth access token
            if(error){
                console.log(error);
            }
            else{
                req.access_token = JSON.parse(body).access_token;
                next();
            }
        }
    )
}
module.exports = generatetoken;