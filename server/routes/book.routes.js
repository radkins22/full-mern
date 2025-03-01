const BookController = require("../controllers/book.controllers");

const { create, read, _delete, readOne, update, addComment, _deleteOne } =
  BookController;

module.exports = (prefix, app) => {
  // "/api/books"
  app.post(prefix, create);
  app.get(prefix, read);
  app.delete(prefix, _delete);

  // "api/books/:_id"
  app.get(`${prefix}/:_id`, readOne);
  app.put(`${prefix}/:_id`, update);
  app.put(`${prefix}/:_id/comment`, addComment);
  app.delete(`${prefix}/:_id`, _deleteOne);
};

// Notes on Routes structure:
// things all routes need (3)
// method Create(post), Read(get), Update(put, patch), Delete(delete)
// url - endpoint string ("https:localhost://8080/api/books")
// function aka callback aka controller
// app.post("books", middleware, (req, res, next) => {})
// app.get("/api/books/:_id")
