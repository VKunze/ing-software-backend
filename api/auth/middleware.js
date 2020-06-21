var jwt = require("jsonwebtoken"); //used to create, sign and verify tokens
var bankWorkerService = require("../bankWorker/bankWorker.service.js");
require("dotenv").config();

async function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);
  if (!token) {
    return res.sendStatus(401);
  }

  // buscar usuario en la db por token
  const candidate = await bankWorkerService.findByToken(token);

  if (!candidate) {
    res.status(401).send({
      success: false,
      code: "TOKEN_REQUIRED",
      message: "Not authorized.",
    });
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, content) => {
    if (err || (candidate.username = !content.username)) {
      return res.status(403).send({
        success: false,
        code: "TOKEN_INVALID",
        message: "Not authorized.",
      });
    }
    req.user = content.username;
    req.headers.userId = candidate.id.toString();
    next();
  });
}

function check_scopes(scopes) {
  return function(req, res, next) {
    const authHeader = req.headers["authorization"];
    const apiKey = authHeader && authHeader.split(" ")[1];
    //
    // check if any of the scopes defined in the token,
    // is one of the scopes declared on check_scopes
    //
    var decoded = jwt.decode(apiKey);
    console.log(decoded)
    for (var i =0; i<decoded.scopes.length; i++){
      for (var j=0; j<scopes.length; j++){
          if(scopes[j] === decoded.scopes[i]) return next();
      }
    }
    return res.status(401).send({
      success: false,
      code: "INVALID_SCOPE",
      message: "Not authorized.",
    });
  }
}

function check_expiration(req, res, next){
  const authHeader = req.headers["authorization"];
  const apiKey = authHeader && authHeader.split(" ")[1];

  jwt.verify(apiKey, process.env.COMPARE_PHOTOS_KEY, function(err, decoded) {
    if (err && err.name == 'TokenExpiredError') {
      return res.status(401).send({
        success: false,
        code: "API_KEY_EXPIRED",
        message: "Not authorized.",
      });
    }
    next()
  });
}

module.exports = {
  authenticateToken: authenticateToken,
  check_scopes: check_scopes,
  check_expiration: check_expiration
};
