const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");

router.post("/signup", AuthController.signup);

router.post("/emailverification", AuthController.verifyemail);
router.post("/signin", AuthController.signin);

router.post("/googleLogin", AuthController.googleLogin);

router.post("/facebookLogin", AuthController.FacebookLogin);

module.exports = router;
