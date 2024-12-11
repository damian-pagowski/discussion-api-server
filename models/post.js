const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  author: { type: String, required: true },
  categoryId: { type: Number, required: true },
  votes: { type: Number, default: 0 },
  deleted: { type: Boolean, required: true, default: false },
  commentCount: { type: Number, required: true, default: 0 },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Post", PostSchema);