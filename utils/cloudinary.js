var cloudinary = require("cloudinary");
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploadImage = (id, image) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(`data:image/jpg;base64,${image}`, { public_id: id }, function (
      error,
      result
    ) {
      if (error) {
        reject(error);
      }
      resolve(result);
    });
  });
};
