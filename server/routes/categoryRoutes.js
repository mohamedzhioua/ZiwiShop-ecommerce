const express = require("express");
const router = express.Router();
const CategoryController = require("../controllers/categoryController");
const { isAuth, isAdmin } = require("../middlewares/checkAuth");


router.get("/", isAuth, isAdmin,CategoryController.GetCategories);

router.get("/categoryParents", isAuth,isAdmin, CategoryController.GetCategoryParents);

router.get("/:id", isAuth,isAdmin, CategoryController.GetOneCategory);

router.post("/add", isAuth, isAdmin,CategoryController.AddCategory);

router.patch("/:id",  isAuth,isAdmin,CategoryController.UpdateCategory);

router.delete("/:id", isAuth,isAdmin, CategoryController.DeleteCategory);

module.exports = router;
