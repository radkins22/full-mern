const bcrypt = require("bcrypt");
const User = require("../models/user.model");

module.exports = {
  register: (req, res) => {
    User.findOne({ email: req.body.email })
      .then((user) => {
        if (user) {
          res.json({ msg: "Error", Error: "Email already exists." });
        } else {
          const hashedPassword = bcrypt.hashSync(req.body.password, 12);
          const newUser = new User({ ...req.body, password: hashedPassword });
          newUser.save();
          res.json({ msg: "Success", user: newUser });
        }
      })
      .catch((err) => res.json({ msg: "Error", Error: err }));
  },

  login: (req, res) => {},

  logout: (req, res) => {},

  auth: (req, res) => {},

  update: (req, res) => {
    User.findByIdAndUpdate(req.params._id, req.body)
      .save()
      .then((user) => res.json({ msg: "Success", user }))
      .catch((err) => res.json({ msg: "Error", Error: err }));
  },

  _delete: (req, res) => {
    User.find()
      .then((users) => res.json({ msg: "Success", users }))
      .catch((err) => res.json({ msg: "Error", Error: err }));
  },

  // create: (req, res) => {
  //   const newUser = new User(req.body);
  //   newUser
  //     .save()
  //     .then((user) => res.json({ msg: "Success", user }))
  //     .catch((err) => res.json({ msg: "Error", Error: err }));
  // },
  // read: (req, res) => {
  //   User.find()
  //     .then((users) => res.json({ msg: "Success", users }))
  //     .catch((err) => res.json({ msg: "Error", Error: err }));
  // },
  // readOne: (req, res) => {
  //   User.findById(req.params._id)
  //     .then((users) => res.json({ msg: "Success", users }))
  //     .catch((err) => res.json({ msg: "Error", Error: err }));
  // },
  // update: (req, res) => {
  //   User.findByIdAndUpdate(req.params._id, req.body)
  //     .save()
  //     .then((user) => res.json({ msg: "Success", user }))
  //     .catch((err) => res.json({ msg: "Error", Error: err }));
  // },
  // addComment: (req, res) => {
  //   User.findByIdAndUpdate(req.params._id.comment, req.body)
  //     .save()
  //     .then((user) => res.json({ msg: "Success", user }))
  //     .catch((err) => res.json({ msg: "Error", Error: err }));
  // },
  // _deleteOne: (req, res) => {
  //   User.findByIdAndDelete(req.params._id)
  //     .then((user) => res.json({ msg: "Success", user }))
  //     .catch((err) => res.json({ msg: "Error", Error: err }));
  // },
};
