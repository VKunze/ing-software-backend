 var assert = require("assert");
 const riskSystem = require("../../externalSystems/riskSystem/processRiskPorcentage");

 describe("testPrintSystem", function() {
     it('should return "Aprobada', function() {
         assert.equal('Aprobada', riskSystem.processRiskPorcentage("Gold", "355874644", "30000"));
     })
 });