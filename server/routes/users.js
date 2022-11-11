const express = require('express');
const router = express.Router();
 const UserController = require('../controllers/users')

 // POST request for creating a new user.
router.post('/signup',UserController.signup )

module.exports = router;
