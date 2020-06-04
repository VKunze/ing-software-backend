var assert = require("assert");
const printSystem = require("../externalSystems/printSystem/printSystemCommunication.js");
const db = require("../../db/models/index.js");
const applicationsService = require("../../api/applications/applications.service.js");


describe("testPrintSystem", function() {
    it('should list solicitudes aprobadas', function() {
        var dateTime = new Date();
        var hours = dateTime.getHours();
        var minutes = dateTime.getMinutes();

        printSystem.startClock();
        assert.equal(undefined, printSystem.getReadyCards());

        if (hours == 17 && minutes == 59) {
            assert.equal(getSolicitudesAprobadas(), printSystem.getReadyCards());
        }
    })
});

function getSolicitudesAprobadas() {
    const Solicitude = db.solicitude;
    return Solicitude.findAll({ where: { stateId: applicationsService.getIdState('Aprobada') } })
        .then(data => {
            return data;
        }).catch(err => {
            throw err;
        });
}