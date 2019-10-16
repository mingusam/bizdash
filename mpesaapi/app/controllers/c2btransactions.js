'user strict';
var request = require('request');
var c2bapi = function(req, res, next){
    let url = "https://sandbox.safaricom.co.ke/mpesa/c2b/v1/simulate";
    let auth = "Bearer "+req.access_token;
    request(
        {
            url: url,
            method:"POST",
            headers:{
                Authorization: auth
            },
            json: {
                "ShortCode":"600383",
                "CommandID":"CustomerPayBillOnline",
                "Amount":"100",
                "Msisdn":"0722632126",
                "BillRefNumber":"TestAPI"
            }
        },
        function(error,response,body){
           if(error){
               console.log(error);
           }
           else{
              req.c2boutput = res.status(200).json(body);
              next();
           }
        }
    )
}
module.exports = c2bapi;