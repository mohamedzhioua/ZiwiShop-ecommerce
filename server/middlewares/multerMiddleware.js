const multer = require("multer");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
   if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Please upload only images") );
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });
 
exports.uploadProductImages = upload.fields([{ name: 'images', maxCount: 5 }]);
 