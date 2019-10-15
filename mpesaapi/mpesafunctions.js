var mpesafunctions = function(req,res,next){
    this.req = req;
    this.res = res;
}
mpesafunctions.access =function(req,res,next){
    consumer_key = "bm4Ae6Wx1J7niJhtABTxWjAg7mkIcwZE",
    consumer_secret = "k8oTYrwGFzA72vKj",
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
module.exports = mpesafunctions;