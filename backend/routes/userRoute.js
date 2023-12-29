const express = require("express");
const controllers = require("../controllers/userController");
const router = express.Router();

//login route
//signup route

router.route("/login").post(controllers.loginUser);

router.route("/signup").post(controllers.signupUser);

module.exports = router;
