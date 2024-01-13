const express = require('express');
const multer = require('multer');
const controllers = require('../controllers/TermFinalController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

router.use(requireAuth);

// Set up Multer middleware
const storage = multer.memoryStorage(); // You can change this to store files in memory
const upload = multer({ storage: storage });

// Define your route
router.route("/")
      .post(upload.single('termfinal'), controllers.handleTermFinalUpload)
      .get(controllers.getAllTermFinal)

router.route("/:termFinalId")
      .delete(controllers.deleteTermFinal)


module.exports = router;
