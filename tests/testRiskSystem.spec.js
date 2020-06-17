var assert = require("assert");
const riskSystem = require("../externalSystems/riskSystem/processRiskPorcentage.js");

describe("testRiskSystem", function () {
    it('should return Rechazada', function () {
        assert.equal('Rechazada', riskSystem.processRiskPorcentage("Gold", "355874644", "30000"));
    })
}); 