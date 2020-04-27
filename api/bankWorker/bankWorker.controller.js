var bankWorkerService = require("./bankWorker.service.js");
var helpers = require("../../utils/helpers.js");
const bcrypt = require("bcrypt");

exports.checkdb = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
      res.status(400).send({
        success: false,
        code: "BAD_REQUEST",
        message: "Ingrese username/password",
      });
    }
    const userFromDb = await bankWorkerService.findOne(username);
    if (!userFromDb || !bcrypt.compareSync(password, userFromDb["password"])) {
      res.status(400).send({
        success: false,
        code: "INVALID_CREDENTIALS",
        message: "username y/o password incorrectos",
      });
    } else {
      var token = helpers.generateJWTToken({
        username: username,
        password: password,
      });
      await bankWorkerService.saveToken(token, userFromDb.id);
      res.status(200).send({
        success: true,
        username: userFromDb.username,
        token: token,
      });
    }
  } catch (e) {
    res.status(500).send({
      success: false,
      code: "INTERNAL_SERVER_ERROR",
      message: "Ha ocurrido un error inesperado, intente de nuevo mas tarde!",
    });
  }
};

exports.create = async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
      res.status(400).send({
        success: false,
        code: "BAD_REQUEST",
        message: "Ingrese username/password",
      });
    }
    const respuesta = await bankWorkerService.create(username, password);
    res.status(200).send({
      success: true,
    });
  } catch (e) {
    res.status(500).send({
      success: false,
      code: "INTERNAL_SERVER_ERROR",
      message: "Ha ocurrido un error inesperado, intente de nuevo mas tarde!",
    });
  }
};
