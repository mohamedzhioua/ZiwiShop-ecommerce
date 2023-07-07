const express = require("express");
const router = express.Router();
const ProductController = require("../controllers/productController");

router.get("/options", ProductController.Getoptions);

// router.get("/:id",ProductController);

// router.post("/add", ProductController);

// router.patch("/:id", ProductController);

// router.delete("/:id", ProductController);

module.exports = router;
