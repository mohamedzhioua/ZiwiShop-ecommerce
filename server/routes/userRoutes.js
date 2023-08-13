const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");

router.post("/signup", AuthController.signup);

router.post("/emailverification", AuthController.verifyemail);

router.post("/signin", AuthController.signin);

router.get("/googleLogin", AuthController.googleOauthHandler);

router.get("/me", AuthController.me);

router.post("/facebookLogin", AuthController.FacebookLogin);

router.post("/forgotpassword", AuthController.forgetPassword);

router.post("/resetpassword", AuthController.resetpassword);


module.exports = router;
