const Book = require("../models/book.model");
const { Comment } = require("../models/comment.model");

module.exports = {
  create: (req, res) => {
    const newBook = new Book(req.body);
    newBook
      .save()
      .then((book) => res.json({ msg: "Success", book }))
      .catch((err) => res.json({ msg: "Error", Error: err }));
  },
  read: (req, res) => {
    Book.find()
      .then((books) => res.json({ msg: "Success", books }))
      .catch((err) => res.json({ msg: "Error", Error: err }));
  },
  _delete: (req, res) => {
    Book.find()
      .then((books) => res.json({ msg: "Success", books }))
      .catch((err) => res.json({ msg: "Error", Error: err }));
  },

  readOne: (req, res) => {
    Book.findById(req.params._id)
      .then((book) => res.json({ msg: "Success", book }))
      .catch((err) => res.json({ msg: "Error", Error: err }));
  },
  update: (req, res) => {
    Book.findByIdAndUpdate(req.params._id, req.body)
      .save()
      .then((book) => res.json({ msg: "Success", book }))
      .catch((err) => res.json({ msg: "Error", Error: err }));
  },

  addComment: (req, res) => {
    // console.log(req.body);
    // create and save a comment
    // update the book comments array with the newly created comment
    // return the updated book

    const newComment = new Comment(req.body);
    newComment
      .save()
      .then((comment) => {
        Book.findByIdAndUpdate(
          req.params._id,
          { $push: { comments: comment } },
          { new: true }
        )
          .then((book) => res.json({ msg: "Success", book }))
          .catch((err) => res.json({ msg: "Error", Error: err }));
      })
      .catch((err) => res.json({ msg: "Error", Error: err }));

    // old add without comment model functionality
    // Book.findByIdAndUpdate(req.params._id.comment, req.body)
    //   .save()
    //   .then((book) => res.json({ msg: "Success", book }))
    //   .catch((err) => res.json({ msg: "Error", Error: err }));
  },

  _deleteOne: (req, res) => {
    Book.findByIdAndDelete(req.params._id)
      .then((book) => res.json({ msg: "Success", book }))
      .catch((err) => res.json({ msg: "Error", Error: err }));
  },
};
