const applicationsService = require("../../api/applications/applications.service.js");
const printSystem = require("./printSystemSimulation.js");
const db = require("../../db/models/index.js");
const notifications = require("../../utils/notifications.js");

async function sendSolicitudesAprobadas() {
  var solicitudesAprobadas = await getSolicitudesAprobadas();
  printSystem.receiveSolicitudes(solicitudesAprobadas);
}

const Solicitude = db.solicitude;

async function getSolicitudesAprobadas() {
  const stateId = await applicationsService.getIdState("Aprobada");
  return Solicitude.findAll({
    where: { stateId },
  })
    .then((data) => {
      return data;
    })
    .catch((err) => {  throw err;});
}

function getReadyCards() {
  var cedulas = [];
  var solicitudes = printSystem.sendCardsList(); // array de objetos solicitud
  for (let solicitude in solicitudes) {
    const ci = solicitudes[solicitude].personCedula;
    cedulas.push(ci);
  }
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
