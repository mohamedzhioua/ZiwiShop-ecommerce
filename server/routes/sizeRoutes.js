const express = require("express");
const router = express.Router();
const SizeController = require("../controllers/sizeController");
const { isAuth, isAdmin } = require("../middlewares/checkAuth");

router.get("/", isAuth, isAdmin, SizeController.GetSizes);

router.get("/:id", isAuth, isAdmin, SizeController.GetOneSize);

router.post("/add", isAuth, isAdmin, SizeController.AddSize);

router.patch("/:id", isAuth, isAdmin, SizeController.UpdateSize);

router.delete("/:id", isAuth, isAdmin, SizeController.DeleteSize);

module.exports = router;
