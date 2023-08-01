const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/orderController");
const { isAuth } = require("../middlewares/checkAuth");
 

router.get("/mine",isAuth, OrderController.GetMyOrders);

router.post("/", isAuth, OrderController.CreateOrder);

router.get("/:id", isAuth, OrderController.GetOneOrder);

router.patch("/:id/pay", isAuth, OrderController.PayOrder) 

module.exports = router;
