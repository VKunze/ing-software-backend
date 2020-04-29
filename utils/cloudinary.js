var cloudinary = require("cloudinary");
require("dotenv").config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploadImage = (id, image) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(
      `data:image/jpg;base64,${image}`,
      { public_id: `${id}_${new Date().toISOString()}` },
      function (error, result) {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      }
    );
  });
};
