var list;

function sendCardsList() {
    return list;
}

function receiveSolicitudes(solicitudes) {
    list = solicitudes;
    // setTimeout(sendCardsList, 300000);
    setTimeout(sendCardsList, 1000);
}

module.exports = { receiveSolicitudes, sendCardsList }