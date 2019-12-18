const express = require("express");
const router = express.Router();
const Category = require("../models/category");

router
  .get("/", (req, res, next) => {
    Category.find()
      .then(result => res.json(result))
      .catch(error => next(error));
  })
  .post("/", (req, res, next) => {
    const category = new Category({ ...req.body });
    console.log(JSON.stringify(req.body));
    category
      .save()
      .then(data => {
        res.json(data);
      })
      .catch(error => next(error));
  });

module.exports = router;
