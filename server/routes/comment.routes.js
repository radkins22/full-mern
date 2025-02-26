const CommentController = require("../controllers/comment.controllers");

const { create, read, _delete, readOne, update, addComment, _deleteOne } =
  CommentController;

module.exports = (prefix, app) => {
  // "/api/comments"
  app.post(prefix, create);
  app.get(prefix, read);
  app.delete(prefix, _delete);

  // "/api/comments/:_id"
  app.get(`${prefix}/:_id`, readOne);
  app.put(`${prefix}/:_id`, update);
  app.put(`${prefix}/:_id/comment`, addComment);
  app.delete(`${prefix}/:_id`, _deleteOne);
};
