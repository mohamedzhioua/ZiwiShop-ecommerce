const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

exports.uploadToCloudinary = async (file, path) => {
  return new Promise((resolve, reject) => {
    if (file) {
      cloudinary.v2.uploader
        .upload_stream({ folder: path }, (err, res) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            console.log(`Upload succeed: ${res}`);
            resolve(res);
          }
        })
        .end(file);
    }
  });
};

exports.getImages = async (path, max, sort) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.search
      .expression(`${path}`)
      .sort_by('created_at', `${sort}`)
      .max_results(max)
      .execute()
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
        console.log({ message: error.message })
      });
  });
};
 
exports.removeFromCloudinary = async (public_id) => {
    await cloudinary.uploader.destroy(public_id, function (error, result) {
      console.log("🚀 ~ file: cloudinary.js:28 ~ result", result)
      console.log({ message: error.message })
      });
  } 