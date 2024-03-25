const express = require("express");
const router = express.Router();
const protect = require("../Middleware/authMiddleware");
const {
  RegisterUser,
  loginUser,
} = require("../Controllers/userController");

router.route("/signup").post(RegisterUser);

router.route("/login").post(loginUser);

module.exports = router;
