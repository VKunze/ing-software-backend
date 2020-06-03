function processRiskPorcentage(product, document, salary) {
    const riskPorcentage = riskSystem(product, document, salary);
    if (riskPorcentage > 80) {
        return 'Rechazada'
    } else if (riskPorcentage > 40) {
        return 'Esperando aprobacion'
    } else if (riskPorcentage < 40) {
        return 'Aprobada'
    }
}

function riskSystem(product, document, salary) {
    var riskPorcentage;
    if (document.charAt(0) < 4) {
        riskPorcentage = 30;
    } else if (document.charAt(0) < 6) {
        riskPorcentage = 50;
    } else {
        riskPorcentage = 85;
    }
    return riskPorcentage;
}