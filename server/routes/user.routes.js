const UserController = require("../controllers/user.controllers");

const { create, read, _delete, readOne, update, addComment, _deleteOne } =
  UserController;

module.exports = (prefix, app) => {
  // "/api/users"
  app.post(prefix, create);
  app.get(prefix, read);
  app.delete(prefix, _delete);

  // "api/users/:_id"
  app.get(`${prefix}/:_id`, readOne);
  app.put(`${prefix}/:_id`, update);
  app.put(`${prefix}/:_id/comment`, addComment);
  app.delete(`${prefix}/:_id`, _deleteOne);
};
