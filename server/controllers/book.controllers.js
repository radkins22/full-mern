const Book = require("./models/book.model");

module.exports = {
  create: (req, res) => {
    const newBook = new Book(req.body);
    newBook
      .save()
      .then((book) => res.json({ msg: "Success", book }))
      .catch((err) => res.json({ msg: "Error", Error: err }));
  },
  read: (req, res) => {},
  update: (req, res) => {},
  _delete: (req, res) => {},
};
