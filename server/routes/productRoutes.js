const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/productController");
const { resizeProductImages } = require("../middlewares/resizeProductImages");
const { uploadProductImages } = require("../middlewares/multerMiddleware");

router.get("/options", ProductController.Getoptions);

router.get("/:id", ProductController.GetOneProduct);

router.get("/", ProductController.GetProducts);

router.post(
  "/add",
  uploadProductImages,
  resizeProductImages,
  ProductController.AddProduct
);
router.patch("/:id/image", ProductController.DeleteProductImages);

router.patch(
  "/:id",
  uploadProductImages,
  resizeProductImages,
  ProductController.UpdateProduct
);

// router.delete("/:id", ProductController);

module.exports = router;
