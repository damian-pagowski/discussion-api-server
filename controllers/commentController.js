const Comment = require("../models/comment");

// ** Get comments by Post ID **
exports.getCommentsByPostId = async (req, res, next) => {
  try {
    const comments = await Comment.find({ parentId: req.params.id });
    res.json(comments);
  } catch (error) {
    next(error);
  }
};

// ** Create a new comment **
exports.createComment = async (req, res, next) => {
  try {
    const comment = new Comment({ ...req.body });
    const savedComment = await comment.save();
    res.json(savedComment);
  } catch (error) {
    next(error);
  }
};

// ** Get a single comment by ID **
exports.getCommentById = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.json(comment);
  } catch (error) {
    next(error);
  }
};

// ** Update a comment by ID **
exports.updateCommentById = async (req, res, next) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );
    if (!updatedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.json(updatedComment);
  } catch (error) {
    next(error);
  }
};

// ** Delete a comment by ID **
exports.deleteCommentById = async (req, res, next) => {
  try {
    const result = await Comment.deleteOne({ _id: req.params.id });
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.json({ message: "Comment deleted" });
  } catch (error) {
    next(error);
  }
};

// ** Upvote a comment (increment vote score) **
exports.upvoteComment = async (req, res, next) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      { $inc: { voteScore: 1 } },
      { new: true }
    );
    if (!updatedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.json(updatedComment);
  } catch (error) {
    next(error);
  }
};

// ** Downvote a comment (decrement vote score) **
exports.downvoteComment = async (req, res, next) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      { $inc: { voteScore: -1 } },
      { new: true }
    );
    if (!updatedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.json(updatedComment);
  } catch (error) {
    next(error);
  }
};