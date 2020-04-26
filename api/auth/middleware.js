var jwt = require('jsonwebtoken'); //used to create, sign and verify tokens
var bankWorkerService = require("../bankWorker/bankWorker.service.js");
require("dotenv").config();

async function authenticateToken(req, res, next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]           
    // buscar usuario en la db por token
    const candidate = await bankWorkerService.findByToken(token);
    if(token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.SECRET_KEY, (err, content) => {
        if (err || ( candidate.id =! content.id )) return res.sendStatus(403)
        req.user = content.username
        next()
    })
}

module.exports = {
    authenticateToken: authenticateToken
}