const BookController = require("../controllers/book.controllers");

const { create, update, read, _delete } = BookController;

module.exports = (prefix, app) => {
  // "/api/books"
  app.post(prefix, create);
};

// Notes on Routes structure:
// things all routes need (3)
// method Create(post), Read(get), Update(put, patch), Delete(delete)
// url - endpoint string ("https:localhost://8080/api/books")
// function aka callback aka controller
// app.post("books", middleware, (req, res, next) => {})
// app.get("/api/books/:_id")
