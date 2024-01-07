const express = require('express');
const multer = require('multer');
const controllers = require('../controllers/UploadSlideController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

//router.use(requireAuth);

// Set up Multer middleware
const storage = multer.memoryStorage(); // You can change this to store files in memory
const upload = multer({ storage: storage });

// Define your route
router.route("/uploadslide")
  .post(upload.single('slide'), controllers.handleSlideUpload);

module.exports = router;
