const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskSchema = new Schema({
  title: String,
  url: String,
  list: [String],
  shortList: [String]
});

// eslint-disable-next-line func-names
taskSchema.pre("save", function (next) {
  this.url = this.title.toLowerCase();
  this.url = this.url.replace(/\s/g, "-");
  this.shortList = this.list.slice(0, 2);
  next();
});

module.exports = mongoose.model("Task", taskSchema);
