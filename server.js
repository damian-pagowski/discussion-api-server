require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);

const SERVER_PORT = process.env.SERVER_PORT || 3030;
const DB_URI = process.env.MONGOLAB_URI;
// routers
const categoriesRouter = require("./routes/categories");
const commentsRouter = require("./routes/comments");
const postsRouter = require("./routes/posts");
const indexRouter = require("./routes/index");

app.use("/categories", categoriesRouter);
app.use("/comments", commentsRouter);
app.use("/posts", postsRouter);
app.use("/", indexRouter);

// error handling
app.use(function(err, req, res, next) {
  res.status(err.status || 400);
  return res.send(err.message);
});

mongoose.connect(DB_URI, { useUnifiedTopology: true, useNewUrlParser: true });
app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`));
module.exports = app;
