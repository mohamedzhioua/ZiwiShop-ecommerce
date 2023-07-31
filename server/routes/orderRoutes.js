const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/orderController");
const { isAuth } = require("../middlewares/checkAuth");
 

// router.get("/", OrderController.GetBrands);

router.post("/", isAuth, OrderController.CreateOrder);

router.get("/:id", isAuth, OrderController.GetOneOrder);

 

module.exports = router;
