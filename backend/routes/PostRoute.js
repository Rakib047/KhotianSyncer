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

//delete a post
//router.route()

// Like a post
router.route("/:postId/like").post(requireAuth,postControllers.likePost);

// Comment on a post
router.route("/:postId/comment").post(requireAuth,postControllers.commentOnPost);

module.exports = router;
