var assert = require("assert");
const cloudinaryHelper = require("../utils/cloudinary");
const testHelper = require("./common/testHelper");
const helpers = require("../utils/helpers.js");

const URL_REGEX = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

describe("Files", function () {
  describe("Cloudinary", function () {
    this.slow(1000); // set 1 second as slow category
    it("should return the url of the uploaded image", async function () {
      const image = testHelper.getBase64Image();
      const upload = await cloudinaryHelper.uploadImage("test_image", image);
      if (!upload) {
        assert.fail();
      }
      assert.equal(URL_REGEX.test(upload.secure_url), true);
    });

    it("cloudinary resource_type must be image", async function () {
      const image = testHelper.getBase64Image();
      const upload = await cloudinaryHelper.uploadImage("test_image", image);
      if (!upload) {
        assert.fail();
      }
      assert.equal(upload.resource_type, "image");
    });
  });
});
