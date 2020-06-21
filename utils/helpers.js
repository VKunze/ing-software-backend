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

function generateComparePhotosApiKey(){
    var token = jwt.sign(
        {
            "scopes": ['face_rec']
        },
        process.env.COMPARE_PHOTOS_KEY,
        {
            expiresIn: 600,
        }

    );
    return token;
}

function generateApplicationApiKey(){
    var token = jwt.sign(
        {
            "scopes": ['generateApplication']
        },
        process.env.GENERATE_APPLICATION_KEY,
        {
            expiresIn: 1200,
        }

    );
    return token;
}



module.exports = {
    generateJWTToken: generateJWTToken,
    generateComparePhotosApiKey: generateComparePhotosApiKey,
    generateApplicationApiKey: generateApplicationApiKey
}
