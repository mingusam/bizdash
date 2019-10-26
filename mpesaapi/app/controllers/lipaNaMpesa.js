'user strict';
var request = require('request');
var credentials = require('../helpers/credentials');

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

var timestamp = function getTimeStamp() {
    return new Date().toISOString().replace(/T/, '').replace(/-/, '').replace(/:/, '').replace(/-/, '').replace(/:/, '').replace(/\..+/, '')
}

var lipaNaMpesa = function(accessToken, shortCode, amount, mobileNumber, accountReference, transactionDescription, callback){
    let url = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest";
    let auth = "Bearer "+ accessToken;
    let password = new Buffer(shortCode + credentials.passkey + timestamp()).toString("base64");
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
                returnVal = JSON.stringify(body);
                console.log('body: ' + returnVal);            
                console.log('returnval: ' + returnVal);
                callback(returnVal);
            }
        }
    )
}
module.exports = lipaNaMpesa;

// module.exports = exports = function(library, callback) {
//     modCodes.findOne({name: library}, {modcode: 1}, function (err, mc) {
//         if (err) throw new Error(err);
//         var db = mongoose.createConnection('mongodb://localhost:27017/' + mc.modcode + '?safe=true');
//         var models = {
//         Books: db.model('books', require('./schemas/books'))
//         }
//         callback(models);
//     });
// };

// var Models = require('../models');    
// Models('myLibrary', function(models) {
// console.log(models);
// });