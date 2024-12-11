const Post = require("../models/post");

// ** Get all posts **
const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

// ** Get post by ID **
const getPostById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

// ** Create a new post **
const createPost = async (req, res, next) => {
  try {
    const post = new Post({ ...req.body });
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};

// ** Update a post **
const updatePost = async (req, res, next) => {
  const { id } = req.params;
  const updateData = { ...req.body };
  try {
    const updatedPost = await Post.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};

// ** Delete a post (Soft delete) **
const deletePost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedPost = await Post.findByIdAndUpdate(id, { deleted: true }, { new: true });
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// ** Upvote a post (Increase votes by +1) **
const upvotePost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedPost = await Post.findByIdAndUpdate(id, { $inc: { votes: 1 } }, { new: true });
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};

// ** Downvote a post (Decrease votes by -1) **
const downvotePost = async (req, res, next) => {
  const { id } = req.params;
  try {
    const updatedPost = await Post.findByIdAndUpdate(id, { $inc: { votes: -1 } }, { new: true });
    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(updatedPost);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  upvotePost,
  downvotePost
};