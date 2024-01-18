const PostModel = require("../models/PostModel");

// Create a new post
const createPost = async (req, res) => {
  const { content } = req.body;
  const userId = req.userProperty._id
  const name = req.userProperty.username

  try {
    const post = await PostModel.create({ content, user: userId , userName : name });
    res.status(201).json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.find().sort({ createdAt: -1 }); // Sort by createdAt field in descending order
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a specific post
const getPost = async (req, res) => {
  const { postId } = req.params;

  try {
    const post = await PostModel.findById(postId).populate("user");
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Like a post
const likePost = async (req, res) => {
  const { postId } = req.params;
  const userId = req.userProperty._id;

  try {
    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Check if userId is already in the likes array
    const userIndex = post.likes.indexOf(userId);

    if (userIndex !== -1) {
      // If user already liked, remove the like
      post.likes.splice(userIndex, 1);
    } else {
      // If user hasn't liked, add the like
      post.likes.push(userId);
    }

    await post.save();

    res.status(200).json(post.likes.length);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Comment on a post
const commentOnPost = async (req, res) => {
  const { postId, text } = req.params;
  const userId = req.userProperty._id
  
  try {
    const post = await PostModel.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Add the comment to the comments array
    post.comments.push({ user: userId, text });
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPost,
  likePost,
  commentOnPost,
};
