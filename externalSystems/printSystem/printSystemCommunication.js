const applicationsService = require("../../api/applications/applications.service.js");
const printSystemSimulation = require("./printSystemSimulation");
const db = require("../../db/models/index.js");
const notifications = require("../../utils/notifications.js");
const Solicitude = db.solicitude;

async function getSolicitudesAprobadas() {
  const stateId = await applicationsService.getIdState("Aprobada");
  return Solicitude.findAll({where: { stateId }})
    .then((data) => {return data;})
    .catch((err) => {throw err;});
}

async function sendSolicitudesAprobadas() {
  var solicitudesAprobadas = await getSolicitudesAprobadas();
  // printSystemSimulation.receiveSolicitudes(solicitudesAprobadas);
  getReadyCards(solicitudesAprobadas)
}

var getReadyCards = async function (solicitudes) {
  var cedulas = [];
  // var solicitudes = printSystem.sendCardsList(); // array de objetos solicitud
  for (let solicitude in solicitudes) {
    const ci = solicitudes[solicitude].personCedula;
    cedulas.push(ci);
  }
  cedulas = cedulas.filter(function(item, pos, self) {
    return self.indexOf(item) == pos;
  });
  notifications.sendPushNotificationToAppliants(cedulas);
}

// function updateClock() {
//   var dateTime = new Date();
//   var hours = dateTime.getHours();
//   var minutes = dateTime.getMinutes();

//   if (hours < 10) {
//     hours = "0" + horas;
//   }
//   if (minutes < 10) {
//     minutes = "0" + minutes;
//   }

//   sendSolicitudesAprobadas();
// }

// function startClock() {
//   setTimeout(updateClock, 60000);
// }

// module.exports = { getReadyCards, startClock };
module.exports = { getReadyCards, sendSolicitudesAprobadas };
