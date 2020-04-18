var jwt = require('jsonwebtoken'); //used to create, sign and verify tokens

function generateJWTToken(content, secret, expiresIn, subject){
    var token = jwt.sign(content, secret, {
        expiresIn: expiresIn,
        subject: subject
    });
    return token;
}

module.exports = {
    generateJWTToken: generateJWTToken
}