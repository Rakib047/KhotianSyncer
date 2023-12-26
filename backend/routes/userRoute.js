const express = require("express")
const controllers=require("../controllers/userController")
const router=express.Router()

//login route

router.route("/login")
        .post(controllers.loginUser)

//signup route
router.route("/signup")
        .post(controllers.signupUser)

module.exports=router