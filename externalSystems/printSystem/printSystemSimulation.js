const printSystemCommunication = require("./printSystemCommunication.js");

// var sendCardsList = function (solicitudes) {
//   printSystemCommunication.getReadyCards(solicitudes);
//   // return solicitudes;
// }

function receiveSolicitudes(solicitudes) {
  // list = solicitudes;
  setTimeout(printSystemCommunication.getReadyCards(solicitudes), 10000);
}

module.exports = { receiveSolicitudes};
