const applicationsService = require("../../api/applications/applications.service.js");
const printSystem = require("./printSystemSimulation.js");
const db = require("../../db/models/index.js");

function sendSolicitudesAprobadas() {
    var solicitudesAprobadas = getSolicitudesAprobadas();
    printSystem.receiveSolicitudes(solicitudesAprobadas);
}

const Solicitude = db.solicitude;

function getSolicitudesAprobadas() {
    return Solicitude.findAll({ where: { stateId: applicationsService.getIdState('Aprobada') } })
        .then(data => {
            return data;
        }).catch(err => {
            throw err;
        });
}

function getReadyCards() {
    return printSystem.sendCardsList();
}

function updateClock() {
    var dateTime = new Date();
    var hours = dateTime.getHours();
    var minutes = dateTime.getMinutes();

    if (hours < 10) { hours = '0' + horas; }
    if (minutes < 10) { minutes = '0' + minutes; }

    if (hours == 17 && minutes == 59) {
        sendSolicitudesAprobadas();
    }
}

function startClock() {
    setInterval(updateClock, 10000);
}


exports = getReadyCards, startClock;