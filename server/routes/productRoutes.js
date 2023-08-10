const express = require("express");
const router = express.Router();
const AdminProductController = require("../controllers/adminProductController");
const ClientProductController = require("../controllers/clientProductController");
const { resizeProductImages } = require("../middlewares/resizeProductImages");
const { uploadProductImages } = require("../middlewares/multerMiddleware");
const { isAuth, isAdmin } = require("../middlewares/checkAuth");

router.get("/options", isAuth,isAdmin, AdminProductController.Getoptions);

router.get("/:id", isAuth,isAdmin, AdminProductController.GetOneProduct);

router.get("/", isAuth,isAdmin,AdminProductController.GetProducts);

router.post(
  "/add",
  isAuth,
  isAdmin,
  uploadProductImages,
  resizeProductImages,
  AdminProductController.AddProduct
);
router.patch("/:id/image", isAuth, AdminProductController.DeleteProductImages);

router.patch(
  "/:id",
  isAuth,
  isAdmin,
  uploadProductImages,
  resizeProductImages,
  AdminProductController.UpdateProduct
);

// router.delete("/:id", AdminProductController);

router.get(
  "/client/Products",
  ClientProductController.GetClientProducts
);
router.get("/client/:id", ClientProductController.GetClientOneProduct);
router.get(
  "/categories/client",
  ClientProductController.GetCategories
);
router.get("/ZiwiShop/search", ClientProductController.GetSearchProducts);
router.get("/relatedProducts/:id", ClientProductController.getRelatedProducts);

module.exports = router;
