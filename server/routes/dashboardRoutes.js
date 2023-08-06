const express = require("express");
const router = express.Router();
const DashboardController = require("../controllers/dashboardController");
const { isAuth, isAdmin } = require("../middlewares/checkAuth");


 
router.get("/", isAuth, isAdmin, DashboardController.getInfo);


module.exports = router;