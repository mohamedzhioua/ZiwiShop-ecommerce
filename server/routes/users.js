const express = require("express");
const router = express.Router();
const UserController = require("../controllers/auth");

router.post("/signup", UserController.signup);

router.post("/signin", UserController.signin);

router.post("/googleLogin", UserController.googleLogin);

router.post("/facebookLogin", UserController.FacebookLogin);

module.exports = router;
