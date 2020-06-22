var assert = require("assert");
const riskSystem = require("../externalSystems/riskSystem/processRiskPorcentage.js");

describe("testRiskSystem", function () {
    it("should return Esperando aprobacion", function () {
      assert.equal(
        "Esperando aprobacion",
        riskSystem.processRiskPorcentage("Gold", "355874644", "30000")
      );
    });
}); 