// comment model
const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const commentSchema = new Schema({
  quote: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Comment = model("Comment", commentSchema);

module.exports = { Comment, commentSchema };
