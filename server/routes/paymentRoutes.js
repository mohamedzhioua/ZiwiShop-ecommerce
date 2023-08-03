const express = require("express");
const router = express.Router();
const PaymentController = require("../controllers/paymentController");
const { isAuth } = require("../middlewares/checkAuth");


router.post("/process", isAuth,PaymentController.paymentProcess );

router.get("/stripeapikey", isAuth, PaymentController.getstripeapikey);


module.exports = router;