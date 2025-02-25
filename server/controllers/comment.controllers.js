// comment controllers
const Comment = require("../models/comment.model");

module.exports = {
  create: (req, res) => {
    const newComment = new Comment(req.body);
    newComment
      .save()
      .then((comment) => res.json({ msg: "Success", comment }))
      .catch((err) => res.json({ msg: "Error", Error: err }));
  },
  read: (req, res) => {
    Comment.find()
      .then((comments) => res.json({ msg: "Success", comments }))
      .catch((err) => res.json({ msg: "Error", Error: err }));
  },
  update: (req, res) => {
    Comment.findByIdAndUpdate(req.params._id, req.body)
      .save()
      .then((comment) => res.json({ msg: "Success", comment }))
      .catch((err) => res.json({ msg: "Error", Error: err
      }));
  },
  _delete: (req, res) => {
    Comment.findByIdAndDelete(req.params._id)
      .then((comment) => res.json({ msg: "Success", comment }))
      .catch((err) => res.json({ msg: "Error", Error: err }));
  },
};
