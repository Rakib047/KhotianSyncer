const express = require("express");
const controllers = require("../controllers/userController");
const requireAuth = require('../middleware/requireAuth');
const router = express.Router();

//login route
//signup route

router.route("/login")
      .post(controllers.loginUser);

router.route("/signup")
      .post(controllers.signupUser);

router.route("/profile")
      .put(controllers.updateUser)

router.route("/notification/:userId")
      .post(controllers.pushNotification)
      .delete(controllers.deleteNotification)
router.route("/notification")
      .get(requireAuth,controllers.getNotifications)

module.exports = router;
