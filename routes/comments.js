const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");

router
  .post("/", (req, res, next) => {
    const comment = new Comment({ ...req.body });
    comment
      .save()
      .then(result => res.json(result))
      .catch(error => next(error));
  })
  .get("/:id", (req, res, next) => {
    Comment.findById(req.params.id)
      .then(result => res.json(result))
      .catch(error => next(error));
  })
  .put("/:id", (req, res, next) => {
    const data = { ...req.body };
    Comment.findByIdAndUpdate(req.params.id, data)
      .then(result => res.json(result))
      .catch(error => next(error));
  })
  .delete("/:id", (req, res, next) => {
    Comment.deleteOne({ _id: req.params.id })
      .then(data => {
        return res.json({ message: "comment deleted" });
      })
      .catch(error => next(error));
  })
  .post("/:id", (req, res, next) => {
    const { id } = req.params;
    const { option } = req.body;
    if (!["upVote", "downVote"].includes(option)) {
      throw new Error("Invalid option. Use one of: [ upVote, downVote]");
    }
    Comment.findById(id).then(comment =>
      comment
        .vote(option)
        .then(data => {
          return res.json({ message: data });
        })
        .catch(error => next(error))
    );
  });

module.exports = router;
