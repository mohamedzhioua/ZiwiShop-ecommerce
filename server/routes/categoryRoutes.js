const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/categoryController");


router.get("/", CategoryController.GetCategories);

router.get("/:id", CategoryController.GetOneCategory);

router.post("/add", CategoryController.AddCategory);

router.patch("/:id", CategoryController.UpdateCategory);

router.delete("/:id", CategoryController.DeleteCategory);

module.exports = router;
