const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  parentId: { type: Schema.Types.ObjectId, ref: "Post", required: true },
  timestamp: { type: Date, default: Date.now },
  body: { type: String, required: true },
  author: { type: String, required: true },
  voteScore: { type: Number, required: true, default: 0 },
  deleted: { type: Boolean, required: true, default: false },
  parentDeleted: { type: Boolean, required: true, default: false }
});

module.exports = mongoose.model("Comment", commentSchema);