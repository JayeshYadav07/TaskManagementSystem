const express = require("express");

const router = express.Router();
const UserController = require("../controller/userController");

// User registration route
router.post("/register", UserController.register);

// User login route
router.post("/login", UserController.login);

module.exports = router;
