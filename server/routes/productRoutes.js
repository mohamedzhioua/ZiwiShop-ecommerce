const express = require("express");
const router = express.Router();
const AdminProductController = require("../controllers/adminProductController");
const ClientProductController = require("../controllers/clientProductController");
const { resizeProductImages } = require("../middlewares/resizeProductImages");
const { uploadProductImages } = require("../middlewares/multerMiddleware");

router.get("/options", AdminProductController.Getoptions);

router.get("/:id", AdminProductController.GetOneProduct);

router.get("/", AdminProductController.GetProducts);

router.post(
  "/add",
  uploadProductImages,
  resizeProductImages,
  AdminProductController.AddProduct
);
router.patch("/:id/image", AdminProductController.DeleteProductImages);

router.patch(
  "/:id",
  uploadProductImages,
  resizeProductImages,
  AdminProductController.UpdateProduct
);

// router.delete("/:id", AdminProductController);

router.get("/client/Products", ClientProductController.GetClientProducts);
router.get("/client/:id", ClientProductController.GetClientOneProduct);
router.get("/brandscategories/client", ClientProductController.GetBrandsCategories);
 

module.exports = router;
