var assert = require("assert");
const bcrypt = require("bcrypt");
var bankWorkerHelper = require("../api/bankWorker/bankWorker.service");
var utilsJWTHelper = require("../utils/helpers");

const URL_REGEX = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

describe("BankWorker", function() {
    describe("Login", function() {
        it("create bank worker on db", async function() {
            const user = "admin12345";
            const password = "admin12345";
            const create = bankWorkerHelper.create(user, password);

            if (!create) {
                assert.fail();
            }

            const newUserOnDb = await bankWorkerHelper.findOne(user);
            assert.equal(newUserOnDb["username"], user);
        });

        it("login bank worker", async function() {
            const user = "admin12345";
            const password = "admin12345";
            const userFromDB = await bankWorkerHelper.findOne(user);
            if (!userFromDB) {
                assert.fail();
            }
            const result = bcrypt.compareSync(password, userFromDB["password"]);

            assert.equal(true, result);
        });

        it("login false username bank worker", async function() {
            const user = "admin1234567";
            const userFromDB = await bankWorkerHelper.findOne(user);
            if (userFromDB) {
                assert.fail();
            }
            assert.ok(true);
        });

        it("login false password bank worker", async function() {
            const user = "admin12345";
            const password = "admin";
            const userFromDB = await bankWorkerHelper.findOne(user);
            if (!userFromDB) {
                assert.fail();
            }
            const result = bcrypt.compareSync(password, userFromDB["password"]);

            assert.equal(false, result);
        });

        it("generate token and save token on db", async function() {
            const user = "admin12345";
            const password = "admin12345";

            const token = utilsJWTHelper.generateJWTToken({
                username: user,
                password: password
            });

            if (!token) {
                assert.fail();
            }
            assert.ok(true);

            const userFromDB = await bankWorkerHelper.findOne(user);

            if (!userFromDB) {
                assert.fail();
            }

            await bankWorkerHelper.saveToken(token, userFromDB.id);

            const userFromDBupdated = await bankWorkerHelper.findOne(user);

            if (!userFromDBupdated) {
                assert.fail();
            }
            var result = false;
            if (token == userFromDBupdated.token) {
                result = true;
            }

            assert.equal(true, result);
        });

    });

});