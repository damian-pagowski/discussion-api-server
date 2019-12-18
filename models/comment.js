const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  parentId: { type: Schema.Types.ObjectId, ref: "Post" },
  timestamp: { type: Date, default: Date.now },
  body: { type: String, required: true },
  author: { type: String, required: true },
  voteScore: { type: Number, required: true, default: 0 },
  deleted: { type: Boolean, required: true, default: false },
  parentDeleted: { type: Boolean, required: true, default: false },
});

commentSchema.methods.vote = function(option) {
  const that = this;
  switch (option) {
    case "upVote":
      that.voteScore = that.voteScore + 1;
      break;
    case "downVote":
      that.voteScore = that.voteScore - 1;
      break;
    default:
      break;
  }
  return that.save();
};

module.exports = mongoose.model("Comment", commentSchema);
