var jwt = require("jsonwebtoken"); //used to create, sign and verify tokens
var bankWorkerService = require("../bankWorker/bankWorker.service.js");
require("dotenv").config();

async function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);
  if (token === null) {
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

module.exports = {
  authenticateToken: authenticateToken,
};
