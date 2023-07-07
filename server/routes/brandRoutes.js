const express = require("express");
const router = express.Router();
const BrandController = require("../controllers/BrandController");


router.get("/", BrandController.GetBrands);

router.get("/:id", BrandController.GetOneBrand);

router.post("/add", BrandController.AddBrand);

router.patch("/:id", BrandController.UpdateBrand);

router.delete("/:id", BrandController.DeleteBrand);

module.exports = router;
