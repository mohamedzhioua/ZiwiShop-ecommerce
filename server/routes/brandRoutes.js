const express = require("express");
const router = express.Router();
const BrandController = require("../controllers/brandController");
const { isAuth, isAdmin } = require("../middlewares/checkAuth");
  

router.get("/", isAuth, isAdmin,BrandController.GetBrands);

router.get("/:id", isAuth,isAdmin, BrandController.GetOneBrand);

router.post("/add", isAuth,isAdmin, BrandController.AddBrand);

router.patch("/:id", isAuth,isAdmin, BrandController.UpdateBrand);

router.delete("/:id",  isAuth,isAdmin, BrandController.DeleteBrand);

module.exports = router;
