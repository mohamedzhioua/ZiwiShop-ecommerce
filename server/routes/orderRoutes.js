const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/orderController");
const { isAuth, isAdmin } = require("../middlewares/checkAuth");
 
router.get("/all",isAuth, isAdmin, OrderController.GetAllOrders);

router.get("/mine",isAuth, OrderController.GetMyOrders);

router.post("/", isAuth, OrderController.CreateOrder);

router.get("/:id", isAuth, OrderController.GetOneOrder);

router.patch("/:id/pay", isAuth, OrderController.PayOrder) 

router.delete("/:id", isAuth, OrderController.DeleteOrder) 
 
module.exports = router;
