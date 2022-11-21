const express = require("express");
const router = express.Router();
const UserController = require("../controllers/users");

// POST request for creating a new user.
router.post("/signup", UserController.signup);

// GET request for user login.
router.post("/signin", UserController.signin);

// POST request to handle the Google Login response.
router.post("/google-login", UserController.googleLogin);

// POST request to handle the Google Login response.
router.post("/facebook-login", UserController.FacebookLogin);

module.exports = router;
