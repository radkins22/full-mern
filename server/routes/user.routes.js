const UserController = require("../controllers/user.controllers");

const { register, login, logout, auth, update, _delete } = UserController;

module.exports = (prefix, app) => {
  // "/api/users"
  // passport auth routes
  app.post(`${prefix}/register`, register);
  app.post(`${prefix}/login`, login);
  app.post(`${prefix}/logout`, logout);
  app.get(`${prefix}/auth`, auth);
  // general CRUD routes (should authenticate before any changes)
  app.put(`${prefix}/:_id`, update);
  app.delete(`${prefix}/:_id`, _delete);
};