const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  content: String,
});

module.exports = mongoose.model("Note", noteSchema);
