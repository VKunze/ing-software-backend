var funcionarioBancoService = require("../services/funcionarioBanco.service.js");
var helpers = require('../utils/helpers.js');

exports.checkdb = async (req, res) => {
  try {
    const usuario = req.body.username;
    const contraseña = req.body.password;
    if (!usuario || !contraseña) {
      res.status(400).send({
        success: false,
        code: 'BAD_REQUEST',
        message: 'Ingrese usuario/contraseña'
      });
    }
    const userFromDb = await funcionarioBancoService.findOne(usuario, contraseña);
    if (!userFromDb) {
      res.status(400).send({
        success: false,
        code: 'INVALID_CREDENTIALS',
        message: 'Usuario y/o contraseña incorrectos'
      });
    } else {
      var token = helpers.generateJWTToken(
        {
          usuario: usuario,
          contraseña: contraseña
        },
        'secretproyectkey', '60m', usuario
      );
      res.status(200).send({
        success: true,
        username: userFromDb.usuario,
        token: token
      });
    }
  } catch (e) {
    res.status(500).send({
      success: false,
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Ha ocurrido un error inesperado, intente de nuevo mas tarde!'
    });
  }
}

exports.create = async (req, res) => {
  try {
    const usuario = req.body.username;
    const contraseña = req.body.password;
    if (!usuario || !contraseña) {
      res.status(400).send({
        success: false,
        code: 'BAD_REQUEST',
        message: 'Ingrese usuario/contraseña'
      });
    }
    const respuesta = await funcionarioBancoService.create(usuario, contraseña);
    res.status(200).send({
      success: true
    });
  } catch (e) {
    res.status(500).send({
      success: false,
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Ha ocurrido un error inesperado, intente de nuevo mas tarde!'
    });
  }
}
