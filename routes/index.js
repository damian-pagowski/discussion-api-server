const express = require("express");
const router = express.Router();
const Post = require("../models/post");
const Category = require("../models/category");

router.get("/:category/posts", (req, res) => {
  const category = req.params.category;
  Category.findOne({ name: category })
    .then(cat =>
      Post.find({ category: cat._id })
        .populate("category", "name -_id")
        .then(result => res.json(result))
    )
    .catch(error => next(error));
});

module.exports = router;
