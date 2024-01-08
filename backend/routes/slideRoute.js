const express = require('express');
const multer = require('multer');
const controllers = require('../controllers/SlideController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth);

// Set up Multer middleware
const storage = multer.memoryStorage(); // You can change this to store files in memory
const upload = multer({ storage: storage });

// Define your route
router.route("/")
      .post(upload.single('slide'), controllers.handleSlideUpload)
      .get(controllers.getAllSlide)

router.route("/:slideId")
      .delete(controllers.deleteSlide)


module.exports = router;
