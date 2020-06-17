const printSystemC = require("./printSystemCommunication.js");
var list;

function sendCardsList() {
    printSystemC.getReadyCards();
    return list;
}

function receiveSolicitudes(solicitudes) {
    list = solicitudes;
    // setTimeout(sendCardsList, 300000);
    setTimeout(sendCardsList, 10000);
}

module.exports = { receiveSolicitudes, sendCardsList }