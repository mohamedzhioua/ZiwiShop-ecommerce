const express = require("express");
const router = express.Router();
const SizeController = require("../controllers/sizeController");


router.get("/", SizeController.GetSizes);

router.post("/add", SizeController.AddSize);

router.patch("/:id", SizeController.UpdateSize);

module.exports = router;
