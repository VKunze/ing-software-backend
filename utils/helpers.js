var jwt = require('jsonwebtoken'); //used to create, sign and verify tokens

function generateJWTToken(payload, secret){//}, expiresIn, subject){
    var token = jwt.sign(
        payload, 
        secret/*, 
        {
            expiresIn: expiresIn,
            subject: subject
        }
        */
        );
    return token;
}

module.exports = {
    generateJWTToken: generateJWTToken
}