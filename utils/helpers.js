var jwt = require('jsonwebtoken'); //used to create, sign and verify tokens
require("dotenv").config();


function generateJWTToken(payload){
    var token = jwt.sign(
        payload, 
        process.env.SECRET_KEY, 
        {
            expiresIn: "1h",
            //subject: subject
        });
    return token;
}

module.exports = {
    generateJWTToken: generateJWTToken
}