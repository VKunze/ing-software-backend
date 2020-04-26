const db = require("../db/index.js");
const bcrypt = require("bcrypt");
const BankWorker = db.bankWorker;
const Op = db.Sequelize.Op;

// Find a single username and password
exports.findOne = async (username) => {
  // const passwordHasheada = await hashpassword(password);
  return BankWorker.findOne({ where: { username } })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
};

exports.create = async (username, password) => {
  bcrypt.hash(password, 10, function (err, hash) {
    if (err) {
      throw err;
    }
    BankWorker.create({ username: username, password: hash })
      .then((data) => {
        return data;
      })
      .catch((e) => {
        throw e;
      });
  });
};

async function hashpassword(password) {
  const passwordHasheada = await new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, function (err, hash) {
      if (err) reject(err);
      resolve(hash);
    });
  });
  console.log("in func: " + passwordHasheada);
  return passwordHasheada;
}

exports.saveToken = async (token, id) => {

  return BankWorker.update({
    token: token,
  }, {
    where: {
      id: id
    }
  });
};

exports.findByToken = async (token) => {

  return BankWorker.findOne({ where: { token } })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      throw err;
    });
};