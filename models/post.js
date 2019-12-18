const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  timestamp: { type: Date, default: Date.now },
  title: { type: String, required: true },
  body: { type: String, required: true },
  author: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  voteScore: { type: Number, required: true, default: 0 },
  deleted: { type: Boolean, required: true, default: false },
  commentCount: { type: Number, required: true, default: 0 },
});

postSchema.methods.vote = function(option) {
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

module.exports = mongoose.model("Post", postSchema);
