const CommentController = require("../controllers/comment.controllers");

const { create, update, read, _delete } = CommentController;

module.exports = (prefix, app) => {
  // "/api/comments"
  app.post(prefix, create);
  app.get(prefix, read);
  app.put(prefix, update);
  app.delete(prefix, _delete);
};
