const Image = require("../models/image");

const handleImages = async (imageDataArray) => {
   const createdImages = await Promise.all(
    imageDataArray.map(async (imageData) => {
      const { url, cloudinary_id } = imageData;
      const newImage = await Image.create({ url, cloudinary_id });
      return newImage._id;
    })
  );
  return createdImages;
};
module.exports = handleImages;
