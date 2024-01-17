const express = require("express");
const postControllers = require("../controllers/PostController");
const requireAuth = require("../middleware/requireAuth");
const router = express.Router();

// Create a new post
router.route("/").post(requireAuth,postControllers.createPost);

// Get all posts
router.route("/").get(postControllers.getAllPosts);

// Get a specific post
router.route("/:postId").get(postControllers.getPost);

// Like a post
router.route("/:postId/like").post(postControllers.likePost);

// Comment on a post
router.route("/:postId/comment").post(postControllers.commentOnPost);

module.exports = router;
