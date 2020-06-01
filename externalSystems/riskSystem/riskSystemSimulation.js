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

module.exports = riskSystem;