const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  timestamp: { type: Date, default: Date.now },
  title: { type: String, required: true },
  body: { type: String, required: true },
  author: { type: String, required: true },
  categoryId: { type: Number, required: true }, 
  votes: { type: Number, required: true, default: 0 },
});

module.exports = mongoose.model("Post", postSchema);