const { uploadToCloudinary } = require("../utils/cloudinaryHandler");
const sharp = require("sharp");

exports.resizeProductImages = async (req, res, next) => {
  try {
    if (
      !req.files.images ||
      req.files.images?.length < 1 ||
      req.files.images === undefined
    ) {
      req.body.images = [];
      return next();
    }
    
    if (req.files.images.length > 5)
    throw new Error("You can upload 5 images max");

    req.body.images = [];
    
    await Promise.all(
      req.files.images.map(async (file, i) => {
        const path = `${process.env.APP_NAME}/products/`;
        
        const processedImage = await sharp(file.buffer)
        .toFormat("webp")
        .webp({ quality: 90 })
        .toBuffer();
        
        const filePath = await uploadToCloudinary(processedImage, path);
        
        req.body.images.push({
          url: filePath.url,
          cloudinary_id: filePath.public_id,
        });
      })
      );
      
      next();
    } catch (error) {
      next(error);
    }
  };
  