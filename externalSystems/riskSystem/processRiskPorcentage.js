const riskSystem = require('./riskSystemSimulation');

function processRiskPorcentage() {
    const riskPorcentage;
    if (riskPorcentage > 80) {
        return 'Solicitud Rechazada'
    } else if (riskPorcentage > 40) {
        return 'La solicitud se revisará manualmente'
    } else if (riskPorcentage < 40) {
        return 'Solicitud aprobada'
    }
}