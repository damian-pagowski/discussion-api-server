const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const Comment = require("../models/comment");
router
  .get("/", (req, res, next) => {
    Post.find()
      .populate("category", "name -_id")
      .then(data => {
        res.json(data);
      })
      .catch(error => next(error));
  })
  .post("/", (req, res, next) => {
    const post = new Post({ ...req.body });
    post
      .save()
      .then(data => {
        res.json(data);
      })
      .catch(error => next(error));
  })
  .get("/:_id", (req, res, next) => {
    Post.findById(req.params._id)
      .populate("category", "name -_id")
      .then(data => {
        res.json(data);
      })
      .catch(error => next(error));
  })
  .delete("/:_id", (req, res, next) => {
    Post.deleteOne({ _id: req.params._id })
      .then(data => {
        return res.json({ message: "Post Deleted" });
      })
      .catch(error => next(error));
  })
  .put("/:_id", (req, res, next) => {
    const { _id } = req.params;
    const update = { ...req.body };
    Post.findByIdAndUpdate(_id, update, { returnNewDocument: true })
      .then(data => {
        return res.json(data);
      })
      .catch(error => next(error));
  })
  .post("/:_id", (req, res, next) => {
    const { _id } = req.params;
    const { option } = req.body;
    if (!["upVote", "downVote"].includes(option)) {
      throw new Error("Invalid option. Use one of: [ upVote, downVote]");
    }
    Post.findById(_id).then(post =>
      post
        .vote(option)
        .then(data => {
          return res.json({ message: data });
        })
        .catch(error => next(error))
    );
  })
  .get("/:id/comments", (req, res) => {
    Comment.find({ parentId: req.params.id })
      .then(data => {
        return res.json({ message: data });
      })
      .catch(error => next(error));
  });

module.exports = router;
