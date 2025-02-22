// book model
const mongoose = require("mongoose");
const { commentSchema } = require("./comment.model");
const { Schema, model } = mongoose;

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    comments: [commentSchema],
  },
  { timestamps: true }
);

module.exports = model("Book", bookSchema);
