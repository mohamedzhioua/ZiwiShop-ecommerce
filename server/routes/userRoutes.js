const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/authController");

router.post("/createUser", AuthController.createUser);

router.post("/activation/:activationToken", AuthController.activation);

router.post("/signin", AuthController.signin);

router.post("/googleLogin", AuthController.googleLogin);

router.post("/facebookLogin", AuthController.FacebookLogin);

module.exports = router;
