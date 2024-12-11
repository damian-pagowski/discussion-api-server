const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: { type: String, required: true },
  path: { type: String, required: true },
  categoryId: { type: Number, required: true, unique: true }
});

module.exports = mongoose.model("Category", categorySchema);